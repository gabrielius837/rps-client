import { BigNumber, constants } from "ethers";
import { RockPaperScissors } from "../../typechain-types";
import { GameUpdatedEvent, ValidatedMovesEvent } from "../../typechain-types/contracts/RockPaperScissors";
import { RoundMoves } from "./types";

export enum ClientGameState {
    NotExists,
    Error,

    // waiting for opponent
    ChallengerWaitingForOpponent,
    ObserverWaitingForOpponent,
    TimeoutWaitingForOpponent,

    // submitting/validating moves
    ChallengerMoves,
    OpponentMoves,
    ObserverMoves,

    // timeout
    WinnerTimeout,
    LoserTimeout,
    ObserverTimeout,

    // claim
    ClaimPot,

    // finished
    WinnerFinished,
    LoserFinished,
    AbortedFinished,
    ObserverFinished
}

const resolveWaitingForOpponent = (address: string, wrapper: RockPaperScissors.GameWrapperStructOutput): ClientGameState => {
    if (wrapper.game.challenger.adr === constants.AddressZero)
        return ClientGameState.NotExists;

    if (wrapper.game.updateTimestamp.add(wrapper.context.waitingForOpponentTimeout).lte(wrapper.timestamp))
        return ClientGameState.TimeoutWaitingForOpponent;

    const isChallenger = wrapper.game.challenger.adr === address;

    return isChallenger ? ClientGameState.ChallengerWaitingForOpponent : ClientGameState.ObserverWaitingForOpponent;
}

const timeoutedPlayer = (game: RockPaperScissors.GameStructOutput): RockPaperScissors.PlayerStructOutput => {
    if (game.state === 1) {
        return game.opponent.hashedMove === constants.HashZero ? game.opponent : game.challenger;
    } else {
        return game.opponent.move === constants.HashZero ? game.opponent : game.challenger;
    }
}

const resolveMoves = (address: string, wrapper: RockPaperScissors.GameWrapperStructOutput) => {
    const isTimeout = wrapper.game.updateTimestamp.add(wrapper.context.moveTimeout).lte(wrapper.timestamp);
    if (isTimeout) {
        const isPlayer = address === wrapper.game.challenger.adr || address === wrapper.game.opponent.adr;
        if (!isPlayer)
            return ClientGameState.ObserverTimeout;
        
        const player = timeoutedPlayer(wrapper.game);
        return player.adr === address ? ClientGameState.LoserTimeout : ClientGameState.WinnerTimeout;
    }
    else {
        switch (address) {
            case wrapper.game.challenger.adr:
                return ClientGameState.ChallengerMoves;
            case wrapper.game.opponent.adr:
                return ClientGameState.OpponentMoves;
            default:
                return ClientGameState.ObserverMoves;
        }
    }
}

const resolveFinishedGame = (address: string, game: RockPaperScissors.GameStructOutput): ClientGameState => {
    if (game.opponent.adr === constants.AddressZero)
        return ClientGameState.AbortedFinished;

    if (address === game.challenger.adr || address === game.opponent.adr) {
        return game.winner === address ? ClientGameState.WinnerFinished : ClientGameState.LoserFinished;
    }

    return ClientGameState.ObserverFinished;
}

export const resolveClientGameState = (
    address: string | undefined | null,
    wrapper: RockPaperScissors.GameWrapperStructOutput | undefined
): ClientGameState => {
    if (!address || !wrapper)
        return ClientGameState.Error;
    if (wrapper.game.updateTimestamp.add(wrapper.context.claimTimeout).lte(wrapper.timestamp))
        return ClientGameState.ClaimPot;

    switch (wrapper.game.state) {
        case 0:
            return resolveWaitingForOpponent(address, wrapper);
        case 1:
        case 2:
            return resolveMoves(address, wrapper);
        case 3:
            return resolveFinishedGame(address, wrapper.game);
        default:
            console.error('Unexpected value received while evaluating game state', wrapper.game.state);
            return ClientGameState.Error;
    }
}

export const isLocalStorageAvailable = (): boolean => {
    try {
        return !!window.localStorage;
    } catch (error) {
        return false;
    }
}

export const fetchMoves = async (gameId: BigNumber, contract: RockPaperScissors, wrapper: RockPaperScissors.GameWrapperStructOutput) => {
    const arr: RoundMoves[] = Array(wrapper.context.roundThreshold)
        .fill({ challenger: 0, opponent: 0 });

    if (wrapper.game.acceptBlockNumber.gt(0) && wrapper.game.validateBlockNumber.gt(0)) {
        const filter = contract.filters.ValidatedMoves(gameId);
        const events = await contract.queryFilter<ValidatedMovesEvent>(
            filter,
            wrapper.game.acceptBlockNumber.toNumber(),
            wrapper.game.validateBlockNumber.toNumber()
        );

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.args.round >= arr.length)
                continue;
            arr[event.args.round] = {
                challenger: event.args.challengerMove,
                opponent: event.args.opponentMove
            }
        }
    }

    return arr;
}

export const resolveEventListeners = (
    gameId: BigNumber,
    contract: RockPaperScissors,
    wrapper: RockPaperScissors.GameWrapperStructOutput, 
    gameUpdateCallback: (contract: RockPaperScissors, gameId: BigNumber) => Promise<void>,
    movesUpdateCallback: (gameId: BigNumber, round: number, challengerMove: number, opponentMove: number) => Promise<void>
) => {
    if (wrapper.game.challenger.adr === constants.AddressZero || wrapper.game.state === 3) {
        contract.removeAllListeners();
        return;
    }

    switch (wrapper.game.state) {
        case 0:
            resolveGameUpdatedListener(gameId, contract, gameUpdateCallback);
            break;
        case 1:
        case 2:
            resolveGameUpdatedListener(gameId, contract, gameUpdateCallback);
            resolveValidatingMovesListener(gameId, contract, movesUpdateCallback);
            break;
        case 3:
            contract.removeAllListeners();
            break;
        default:
            contract.removeAllListeners();
            console.error('unexpected game state value', wrapper.game.state);
            break;
    }
}

const GAME_UPDATED = 'GameUpdated';
const resolveGameUpdatedListener = (
    gameId: BigNumber,
    contract: RockPaperScissors,
    gameUpdateCallback: (contract: RockPaperScissors, gameId: BigNumber) => Promise<void>
) => {
    if (contract.listenerCount(GAME_UPDATED) > 0)
        return;
    
    const filter = contract.filters.GameUpdated(gameId);
    contract.on<GameUpdatedEvent>(filter, (gameId) => gameUpdateCallback(contract, gameId));
}

const VALIDATING_MOVES = 'ValidatedMoves';
const resolveValidatingMovesListener = (
    gameId: BigNumber,
    contract: RockPaperScissors,
    movesUpdateCallback: (gameId: BigNumber, round: number, challengerMove: number, opponentMove: number) => Promise<void>
) => {
    if (contract.listenerCount(VALIDATING_MOVES) > 0)
        return;

    const filter = contract.filters.ValidatedMoves(gameId);
    contract.on<ValidatedMovesEvent>(filter,
        (gameId, round, challengerMove, opponentMove) => movesUpdateCallback(gameId, round, challengerMove, opponentMove));
};

export const getPlayer = (game: RockPaperScissors.GameStructOutput, address: string): RockPaperScissors.PlayerStructOutput | undefined => {
    if (game.challenger.adr === address)
        return game.challenger;
    else if (game.opponent.adr === address)
        return game.opponent;
    else
        return undefined;
}

export const getOtherPlayer = (game: RockPaperScissors.GameStructOutput, address: string): RockPaperScissors.PlayerStructOutput | undefined => {
    const isChallenger = game.challenger.adr === address;
    const isOpponent = game.opponent.adr === address;
    if (isChallenger || isOpponent)
        return isChallenger ? game.challenger : game.opponent;
    else
        return undefined;
}