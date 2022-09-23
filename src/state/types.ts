import { BigNumber } from "ethers";

export enum GameState {
    WaitingForOpponent,
    PendingMoves,
    ValidatingMoves,
    Finished
}

export enum Move {
    Invalid,
    Rock,
    Paper,
    Scissors
}

export interface Player {
    adr: string;
    score: number;
    hashedMove: string;
    move: string;
}

export interface Game {
    challenger: Player
    opponent: Player
    state: number;
    round: number;
    pot: BigNumber;
    updateTimestamp: BigNumber;
    creationBlockNumber: BigNumber;
    passwordHash: string;
    referral: string;
    winner: string;
    contextIndex: BigNumber;
}

export interface Context {
    waitingForOpponentTimeout: BigNumber;
    moveTimeout: BigNumber;
    scoreThreshold: number;
    roundThreshold: number;
    ownerTipRate: BigNumber;
    referralTipRate: BigNumber;
}

export interface GameWrapper {
    game: Game
    context: Context
    timestamp: BigNumber;
}

export interface IndexedGameWrapper extends GameWrapper {
    id: BigNumber;
}

export interface RoundResult {
    challenger: Move;
    opponent: Move;
}

export interface GameRoundContext extends GameWrapper {
    roundResults: RoundResult[];
}