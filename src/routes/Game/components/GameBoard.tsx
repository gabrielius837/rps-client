import { BigNumber } from "ethers";

import { Box, Flex } from "../../../components/Box";
import { Button } from "../../../components/Button";
import { Countdown } from "../../../components/Countdown";
import { RockPaperScissors } from "../../../typechain-types";
import StyledBackground from "../../StyledBackground";
import { RoundMoves } from "../types";
import SubmitController from "./SubmitController";
import Scoreboard from "./Scoreboard";
import { StateCard } from './Card';
import ValidateController from "./ValidateController";
import { Switch } from "../../../components/AnimationWrapper";
import { useInfoModal } from "../../../components/Modal";
import { MoveContext } from "../../../components/GameContext";

const getController = (
    state: number,
    address: string,
    wrapper: RockPaperScissors.GameWrapperStructOutput,
    gameId: BigNumber,
    contract: RockPaperScissors,
    callback: () => Promise<void>
) => {
    switch (state) {
        case 1:
            return <SubmitController address={address} wrapper={wrapper} gameId={gameId} contract={contract} callback={callback} />
        case 2:
            return <ValidateController address={address} wrapper={wrapper} gameId={gameId} contract={contract} callback={callback} />
        default:
            console.error('Unexpected state value', state);
            return null;
    }
}

interface Props {
    gameId: BigNumber
    moves: RoundMoves[]
    contract: RockPaperScissors;
    wrapper: RockPaperScissors.GameWrapperStructOutput;
    address: string;
    callback: () => Promise<void>;
}

const GameBoard = ({ gameId, moves, contract, wrapper, address, callback }: Props) => {
    const { onPromptModal } = useInfoModal(<MoveContext wrapper={wrapper} />);
    const duration = wrapper.context.moveTimeout;
    const remaining = wrapper.game.updateTimestamp.add(duration).sub(wrapper.timestamp);

    return (
        <Flex justifyContent='center' width='100%'>
            <Flex margin='4px' maxWidth='640px' alignItems='center' flexDirection='column' flexGrow={1}>
                <Flex margin='4px 0' width='100%'>
                    <StyledBackground>
                        <Flex flexDirection='column' alignItems='center' padding='4px'>
                            <Box margin='4px'>
                                <Countdown duration={duration} remaining={remaining.toNumber()} callback={callback} />
                            </Box>
                            <Box margin='4px'>
                                <Button variant='info' onClick={onPromptModal}>Game context</Button>
                            </Box>
                        </Flex>
                    </StyledBackground>
                </Flex>
                <Flex margin='4px 0' width='100%'>
                    <StyledBackground>
                        <Scoreboard address={address} moves={moves} wrapper={wrapper} />
                    </StyledBackground>
                </Flex>
                <StateCard address={address} wrapper={wrapper} />
                <Switch value={wrapper.game.state.toString()}>
                    <StyledBackground>
                        <Box padding='4px' width='100%'>
                            {getController(wrapper.game.state, address, wrapper, gameId, contract, callback)}
                        </Box>
                    </StyledBackground>
                </Switch>
            </Flex>
        </Flex >
    )
}

export default GameBoard;