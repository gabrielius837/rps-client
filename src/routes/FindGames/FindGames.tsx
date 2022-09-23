import styled from "styled-components";
import { useEffect, useState } from "react";
import './Transition.css';
import { v4 as uuid } from 'uuid';

import { useRockPaperScissorsContract } from "../../hooks";
import GameCard from './GameCard';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import BubbleLoadingIndicator from "../../components/BubbleLoadingIndicator";
import { Button } from "../../components/Button";
import { IndexedGame } from "./types";
import retryPromise from "../../utils/retryPromise";

const GridContainer = styled.div<{ height: number, width: number }>`
    display: grid;
    grid-template-rows: ${({ height }) => `repeat(auto-fill, minmax(${height}px, 1fr))`};
    grid-template-columns: ${({ width }) => `repeat(auto-fill, minmax(${width + 8}px, 1fr))`};
`;

const CenterContainer = styled.div`
    text-align: center;
`

const EVENT = 'GameUpdated';
const className = 'item';
const timeout = 250;
const height = 15 * 21;
const width = 8 * 21;

const FindGames = () => {
    const contract = useRockPaperScissorsContract();
    const [games, setGames] = useState<IndexedGame[]>([]);
    const [listening, setListening] = useState(false);

    const listen = () => {
        if (!contract) {
            console.error('contract is not loaded');
            return;
        }

        contract.on(EVENT, async (id, state) => {
            try {
                if (state !== 0)
                    return;
                const wrapper = await retryPromise(contract.getGame(id), 2);
                const game: IndexedGame = {
                    id,
                    key: uuid(),
                    game: wrapper.game
                }
                addGame(game);
            } catch (error) {
                console.error(error);
            }
        })
    }

    const clearGames = () => setGames([]);
    const removeGame = (key: string) => setGames(games => {
        const temp = games.filter(game => game.key !== key)
        return temp;
    });
    const addGame = (game: IndexedGame) => setGames(games => [game, ...games])

    useEffect(() => {
        return () => {
            contract?.removeAllListeners(EVENT);
            clearGames();
        }
    }, [contract])

    const toggleListening = () => {
        if (!contract)
            return;

        if (!listening)
            listen();
        else
            contract.removeAllListeners(EVENT);

        setListening(x => !x);
    }

    const variant = listening ? 'warning' : 'success';

    return (
        <CenterContainer>
            <Button variant={variant} margin='1rem auto' onClick={toggleListening}>{listening ? 'Stop' : 'Seach'}</Button>
            <BubbleLoadingIndicator show={listening} />
            <TransitionGroup
                component={GridContainer}
                height={height}
                width={width}
            >
                {games.map((game) =>
                    <CSSTransition
                        classNames={className}
                        timeout={timeout}
                        key={game.key}
                    >
                        <GameCard
                            key={game.key}
                            height={height}
                            width={width}
                            game={game}
                            removeCallback={() => removeGame(game.key)}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </CenterContainer>
    )
}

export default FindGames;