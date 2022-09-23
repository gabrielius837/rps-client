import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { constants, utils } from 'ethers';

import Heading from '../../components/Heading';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { IndexedGame } from './types';

interface Props {
    height: number;
    width: number;
    game: IndexedGame;
    removeCallback: () => void;
}

const CardContainer = styled.div<{ height: number, width: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    height: ${({ height }) => `${height}px`};
    width: ${({ width }) => `${width}px`};
`;

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px,
                rgb(0 0 0 / 4%) 0px 4px 8px,
                rgb(0 0 0 / 4%) 0px 16px 24px,
                rgb(0 0 0 / 1%) 0px 24px 32px;
`;

const InfoContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > p:nth-child(2n) {
        margin-bottom: 0.5rem;
    }
`;

const Line = styled.hr`
    height: 0.25rem;
    background-color: ${({ theme }) => theme.colors.border};
    border: none;
    margin: 0.25rem 0;
    border-radius: 1rem;
`;

const cutAddress = (address: string) => `${address.slice(0, 6)}.....${address.slice(address.length - 4)}`
const GameCard = ({ height, width, game, removeCallback }: Props) => {
    const id = game.id.toString();
    return (
        <CardContainer height={height} width={width}>
            <StyledCard>
                <Heading size='lg' center>#{game.id.toString()}</Heading>
                <Line />
                <InfoContainer>
                    <Text as='p'>Challenger:</Text>
                    <Text as='p'>{cutAddress(game.game.challenger.adr)}</Text>
                    <Text as='p'>Pot:</Text>
                    <Text as='p'>{game.game.pot.isZero() ? 'None' : `${utils.formatEther(game.game.pot)} BNB`}</Text>
                    <Text as='p'>Password protected?</Text>
                    <Text as='p'>{game.game.passwordHash === constants.HashZero ? 'No' : 'Yes'}</Text>
                </InfoContainer>

                <Link style={{textDecoration: 'none'}} to={`/game?id=${id}`} target='_blank'><Button variant='success' height='32px' width='100%' mb='8px'>Join</Button></Link>
                <Button variant='warning' height='32px' onClick={removeCallback}>remove</Button>
            </StyledCard>
        </CardContainer>
    )
}

export default GameCard;