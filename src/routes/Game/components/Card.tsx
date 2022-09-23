import { constants } from 'ethers';
import styled from 'styled-components';
import { Switch } from '../../../components/AnimationWrapper';
import { Box, Flex } from '../../../components/Box';
import { ExclamationIcon, NotFoundIcon, TimeoutIcon } from '../../../components/Svg';
import { Text } from '../../../components/Text';
import { RockPaperScissors } from '../../../typechain-types';

interface SizeProps {
    length?: number;
}

export const Card = styled.div<SizeProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    ${({ length }) => length &&
        `width: ${length}px;
         height: ${length}px;`
    }
    background: linear-gradient(-45deg, #33539e, #7facd6, #bfb8da, #e8b7d4, #a5678e);
    background-size: 200% 200%;
    background-position: 50% 50%;
    padding: 16px;
    margin: 16px;
    color: inherit;
    border-radius: 8px;
`;

export const NotFoundCard = () => {
    return (
        <Flex alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Card>
                <NotFoundIcon />
                <Text fontSize='20px'>Game not found</Text>
            </Card>
        </Flex>
    )
}

export const NotConnectedCard = () => {
    return (
        <Flex alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Card length={256}>
                <ExclamationIcon width='160px' height='160px' />
                <Text textAlign='center' fontSize='20px'>In order to use this part of the dapp you need to connect your wallet</Text>
            </Card>
        </Flex>
    )
}

export const LoserMoveTimeoutCard = () => {
    return (
        <Flex alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Card length={256}>
                <TimeoutIcon width='160px' height='160px' />
                <Text textAlign='center' fontSize='20px'>Due to inactivity move was not submitted before timeout :(</Text>
            </Card>
        </Flex>
    )
}

export const ObserverMoveTimeOut = () => {
    return (
        <Flex alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Card length={256}>
                <TimeoutIcon width='160px' height='160px' />
                <Text textAlign='center' fontSize='20px'>Due to inactivity one of :(</Text>
            </Card>
        </Flex>
    )
}

export const LocalStorageWarningCard = () => {
    return (
        <Flex alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Card length={256}>
                <ExclamationIcon width='160px' height='160px' />
                <Text textAlign='center' fontSize='20px'>In order to play this game you need to have local storage enabled</Text>
            </Card>
        </Flex>
    )
}

export const FetchErrorCard = () => {
    return (
        <Flex alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Card length={256}>
                <ExclamationIcon width='160px' height='160px' />
                <Text textAlign='center' fontSize='20px'>Unfortunately could not fetch game data :(</Text>
            </Card>
        </Flex>
    )
}

export const WinnerCard = () => {
    return <Card>Congratulations, you have won this game!</Card>
}

export const LoserCard = () => {
    return <Card>Unfortunately, you have lost this game :(</Card>
}

const getStateMessage = (address: string, wrapper: RockPaperScissors.GameWrapperStructOutput): string => {
    const waitingMsg = 'Waiting for other player';
    let msg: string;
    let isSubmitted: boolean;

    switch (wrapper.game.state) {
        case 1:
            isSubmitted = (wrapper.game.challenger.adr === address && wrapper.game.challenger.hashedMove !== constants.HashZero) ||
                (wrapper.game.opponent.adr === address && wrapper.game.opponent.hashedMove !== constants.HashZero)
            msg = isSubmitted ? waitingMsg : 'Submit move';
            break;
        case 2:
            isSubmitted = (wrapper.game.challenger.adr === address && wrapper.game.challenger.move !== constants.HashZero) ||
                (wrapper.game.opponent.adr === address && wrapper.game.opponent.move !== constants.HashZero)
            msg = isSubmitted ? waitingMsg : 'Validate move';
            break;
        default:
            msg = 'Unknown state';
            break;
    }

    return msg;
}

interface StateCardProps {
    address: string;
    wrapper: RockPaperScissors.GameWrapperStructOutput;
}

export const StateCard = ({ address, wrapper }: StateCardProps) => {
    const msg = getStateMessage(address, wrapper);
    return (
        <Box width='100%' padding='4px'>
            <Switch value={msg}>
                <Text textAlign='center' fontSize='24px'>{msg}</Text>
            </Switch>
        </Box>
    )
}