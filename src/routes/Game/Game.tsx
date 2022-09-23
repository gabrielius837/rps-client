import { BigNumber } from 'ethers';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Fade } from '../../components/AnimationWrapper';
import { Flex } from '../../components/Box';

import BubbleLoadingIndicator from '../../components/BubbleLoadingIndicator';
import { useToast } from '../../components/Toast';
import { useActiveWeb3React, useRockPaperScissorsContract } from '../../hooks';
import { RockPaperScissors } from '../../typechain-types';
import isBigNumberish from '../../utils/isBigNumberish';
import retryPromise from '../../utils/retryPromise';
import { FetchErrorCard, LocalStorageWarningCard, NotConnectedCard, NotFoundCard } from './components/Card';
import ChallengerWaitingForOpponent from './components/ChallengerWaitingForOpponent';
import Finished from './components/Finished';
import GameBoard from './components/GameBoard';
import ObserverWaitingForOpponent from './components/ObserverWaitingForOpponent';
import TimeoutClaim from './components/TimeoutClaim';
import TimeoutMove from './components/TimeoutMove';
import TimeoutWaitingForOpponent from './components/TimeoutWaitingForOpponent';
import { Actor, RoundMoves } from './types';
import { ClientGameState, fetchMoves, isLocalStorageAvailable, resolveClientGameState, resolveEventListeners } from './utils';

const resolveGameId = (gameId: string | null): BigNumber | null => {
    if (!gameId)
        return null;

    return isBigNumberish(gameId) ? BigNumber.from(gameId) : null;
}

const resolveView = (
    clientGameState: ClientGameState,
    gameId: BigNumber | null,
    contract: RockPaperScissors | null,
    wrapper: RockPaperScissors.GameWrapperStructOutput | undefined,
    moves: RoundMoves[] | undefined,
    account: string | undefined | null,
    error: Error | undefined,
    updateWrapper: (contract: RockPaperScissors, gameId: BigNumber) => Promise<void>
): ReactNode => {
    if (!isLocalStorageAvailable())
        return <LocalStorageWarningCard />

    if (!gameId)
        return <NotFoundCard />

    if (!wrapper || !moves || !contract)
        return <FetchErrorCard />

    // short-circuit
    if (!account || error) {
        return <NotConnectedCard />
    }

    const callback = async () => await updateWrapper(contract, gameId);
    switch (clientGameState) {
        case ClientGameState.NotExists:
            return <NotFoundCard />
        case ClientGameState.ChallengerWaitingForOpponent:
            return <ChallengerWaitingForOpponent gameId={gameId} contract={contract} wrapper={wrapper} callback={callback} />
        case ClientGameState.ObserverWaitingForOpponent:
            return <ObserverWaitingForOpponent gameId={gameId} contract={contract} wrapper={wrapper} callback={callback} />
        case ClientGameState.TimeoutWaitingForOpponent:
            return <TimeoutWaitingForOpponent gameId={gameId} address={account} contract={contract} wrapper={wrapper} callback={callback} />
        case ClientGameState.ChallengerMoves:
        case ClientGameState.OpponentMoves:
        case ClientGameState.ObserverMoves:
            return <GameBoard gameId={gameId} address={account} moves={moves} contract={contract} wrapper={wrapper} callback={callback} />
        case ClientGameState.WinnerTimeout:
            return <TimeoutMove actor={Actor.winner} gameId={gameId} contract={contract} wrapper={wrapper} callback={callback}/>
        case ClientGameState.LoserTimeout:
            return <TimeoutMove actor={Actor.loser} gameId={gameId} contract={contract} wrapper={wrapper} callback={callback}/>
        case ClientGameState.ObserverTimeout:
            return <TimeoutMove actor={Actor.observer} gameId={gameId} contract={contract} wrapper={wrapper} callback={callback}/>
        case ClientGameState.ClaimPot:
            return <TimeoutClaim gameId={gameId} contract={contract} wrapper={wrapper} callback={callback} />
        case ClientGameState.WinnerFinished:
            return <Finished actor={Actor.winner} wrapper={wrapper} />
        case ClientGameState.LoserFinished:
            return <Finished actor={Actor.loser} wrapper={wrapper} />
        case ClientGameState.AbortedFinished:
            return <Finished actor={Actor.aborted} wrapper={wrapper} />
        case ClientGameState.ObserverFinished:
            return <Finished actor={Actor.observer} wrapper={wrapper} />
        default:
            console.error('Unexpected value in switch', clientGameState);
            return <NotConnectedCard />
    }
}

const Game = () => {
    const [searchParams] = useSearchParams();
    const { toastError } = useToast();
    const web3 = useActiveWeb3React();
    const [wrapper, setWrapper] = useState<RockPaperScissors.GameWrapperStructOutput>();
    const gameId = useMemo(() => resolveGameId(searchParams.get('id')), [searchParams]);
    const contract = useRockPaperScissorsContract(true);
    const [moves, setMoves] = useState<RoundMoves[]>();
    const [loading, setLoading] = useState(true);

    const gameUpdateCallback = useCallback(async (contract: RockPaperScissors, gameId: BigNumber) => {
        try {
            const newWrapper = await retryPromise(contract.getGame(gameId), 2)
            setWrapper(newWrapper);
        } catch (error) {
            console.error(error);
            toastError('Unexpected error', 'Error occurred while trying to update game info');
        }
    }, [toastError]);

    const movesUpdateCallback = useCallback(async (
        gameId: BigNumber,
        round: number,
        challengerMove: number,
        opponentMove: number
    ) => {
        setMoves(oldMoves => {
            if (!oldMoves || !oldMoves[round])
                return oldMoves;

            const newMoves = [...oldMoves];
            newMoves[round] = { challenger: challengerMove, opponent: opponentMove }
            return newMoves;
        });
    }, [])

    useEffect(() => {
        if (!contract || !gameId)
            return;

        const bootstrap = async () => {
            try {
                setLoading(true);
                const newWrapper = await retryPromise(contract.getGame(gameId), 2)
                const newMoves = await retryPromise(fetchMoves(gameId, contract, newWrapper), 2);
                setWrapper(newWrapper);
                setMoves(newMoves);
            } catch (error) {
                console.error(error);
                toastError('Fetch error', 'Error occurred while trying to retrieve game and move info');
            } finally {
                setLoading(false);
            }
        }

        bootstrap();

        return () => {
            if (contract)
                contract.removeAllListeners();
        };
    }, []);

    useEffect(() => {
        if (!contract || !wrapper || !gameId)
            return;
        resolveEventListeners(gameId, contract, wrapper, gameUpdateCallback, movesUpdateCallback);

    }, [wrapper])

    const updateWrapper = useCallback(async (contract: RockPaperScissors, gameId: BigNumber) => {
        try {
            const newWrapper = await retryPromise(contract.getGame(gameId), 2);
            setWrapper(newWrapper);
        } catch (error) {
            console.error(error);
            toastError('Fetch error', 'Error occurred while trying to retrieve game info');
        }
    }, [])

    const clientGameState = resolveClientGameState(web3.account, wrapper);

    const view = resolveView(clientGameState, gameId, contract, wrapper, moves, web3.account, web3.error, updateWrapper);

    if (loading)
        return (
            <Flex height='100%' justifyContent='center' alignItems='center'>
                <BubbleLoadingIndicator show />
            </Flex>
        )
    else
        return (
            <Fade value={clientGameState.toString()}>
                {view}
            </Fade>
        )
}

export default Game;