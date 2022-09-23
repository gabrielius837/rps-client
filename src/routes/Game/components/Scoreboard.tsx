import { CSSProperties } from 'react';

import { Box, Flex, Grid } from '../../../components/Box';
import { Text } from '../../../components/Text';
import { RockPaperScissors } from '../../../typechain-types';
import type { RoundMoves } from "../types";
import StyledMoveIcon from './StyledMoveIcon';
import { Fade } from '../../../components/AnimationWrapper';
import { Aggregate } from '../../../components/Aggregate';
import MoveIcon from './MoveIcon';

interface Props {
    address: string;
    moves: RoundMoves[];
    wrapper: RockPaperScissors.GameWrapperStructOutput;
}

type Angle = '45deg' | '135deg' | '225deg' | '315deg';

const cutAddress = (address: string) => `${address.slice(0, 6)}.....${address.slice(address.length - 4)}`

const gridPosition = (angle: Angle, current: boolean, player: string, relatedAddress: string, columnStart: number, columnEnd: number, rowStart: number, rowEnd: number): CSSProperties => {
    return {
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        background: player === relatedAddress && !current ? `linear-gradient(${angle}, rgba(255,255,255,0.5) 0%, rgba(51,83,158,0.2) 100%)` : undefined
    }
}

const rows = 'repeat(4, 1fr)';

const Scoreboard = ({ address, moves, wrapper }: Props) => {
    const rounds = wrapper.context.roundThreshold;
    const columns = `repeat(${wrapper.context.roundThreshold + 2}, 1fr)`;

    return (
        <Grid gridTemplateColumns={columns} gridTemplateRows={rows} width='100%'>
            <Flex
                style={gridPosition('225deg', false, address, wrapper.game.challenger.adr, 1, 1, 1, 5)}
                justifyContent='center'
                alignItems='center'
                borderRadius='8px 0 0 8px'
            >
                <Fade value={wrapper.game.challenger.score.toString()}>
                    <Text fontSize='32px'>{wrapper.game.challenger.score}</Text>
                </Fade>
            </Flex>
            <Flex
                style={gridPosition('135deg', false, address, wrapper.game.challenger.adr, 2, rounds + 2, 1, 1)}
                width='100%'
                justifyContent='space-between'
                borderRadius='0 0 8px 0'
                padding='16px'
            >
                <Flex alignItems='center'>
                    <Text as='p' fontSize='20px'>Challenger</Text>
                </Flex>
                <Flex alignItems='center'>
                    <Text fontSize='20px'>{cutAddress(wrapper.game.challenger.adr)}</Text>
                </Flex>
            </Flex>
            {moves.map((move, index) => {
                const current = wrapper.game.round === index;
                const variant = current ? 'tagged' : 'plain';
                return <Aggregate key={index}>
                    <Fade value={variant}>
                        <StyledMoveIcon variant={variant} style={gridPosition('135deg', current, address, wrapper.game.challenger.adr, 2 + index, 2 + index, 2, 2)}>
                            <MoveIcon value={move.challenger} />
                        </StyledMoveIcon>
                    </Fade>
                    <Fade value={variant}>
                        <StyledMoveIcon variant={variant} style={gridPosition('315deg', current, address, wrapper.game.opponent.adr, 2 + index, 2 + index, 3, 3)}>
                            <MoveIcon value={move.opponent} />
                        </StyledMoveIcon>
                    </Fade>
                </Aggregate>
            })}
            <Flex 
                style={gridPosition('315deg', false, address, wrapper.game.opponent.adr, 2, rounds + 2, 4, 4)}
                width='100%'
                justifyContent='space-between'
                padding='16px'
                borderRadius='8px 0 0 0'
            >
                <Flex alignItems='center'>
                    <Text fontSize='20px'>{cutAddress(wrapper.game.opponent.adr)}</Text>
                </Flex>
                <Flex alignItems='center'>
                    <Text fontSize='20px'>Opponent</Text>
                </Flex>
            </Flex>
            <Flex
                style={gridPosition('45deg', false, address, wrapper.game.opponent.adr, rounds + 2, rounds + 2, 1, 5)}
                justifyContent='center'
                alignItems='center'
                borderRadius='0 8px 8px 0'
            >
                <Fade value={wrapper.game.opponent.score.toString()}>
                    <Text fontSize='32px'>{wrapper.game.opponent.score}</Text>
                </Fade>
            </Flex>
        </Grid>
    );
};

export default Scoreboard;