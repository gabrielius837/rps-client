import { BigNumber } from "ethers";

import { Box, Flex } from "../../../components/Box";
import { Button } from "../../../components/Button";
import { Countdown } from "../../../components/Countdown";
import { WaitingForOpponentContext } from "../../../components/GameContext";
import { useInfoModal } from "../../../components/Modal";
import { Text } from "../../../components/Text";
import { useToast } from "../../../components/Toast";
import useStore from "../../../state";
import { RockPaperScissors } from "../../../typechain-types";
import StyledBackground from "../../StyledBackground";

interface Props {
    gameId: BigNumber;
    address: string;
    contract: RockPaperScissors;
    wrapper: RockPaperScissors.GameWrapperStructOutput;
    callback: () => Promise<void>;
}

const margin = '8px auto';

const TimeoutWaitingForOpponent = ({ gameId, address, contract, wrapper, callback }: Props) => {
    const transactionPending = useStore(x => x.transactionPending);
    const setTransactionPending = useStore(x => x.setTransactionPending);
    const { toastSuccess, toastError } = useToast();
    const { onPromptModal } = useInfoModal(<WaitingForOpponentContext wrapper={wrapper} />);

    const duration = wrapper.context.claimTimeout;
    const remaining = wrapper.game.updateTimestamp
        .add(duration)
        .sub(wrapper.timestamp);

    const abortGame = async () => {
        try {
            setTransactionPending(true);
            const tx = await contract.abortGame(gameId);
            await tx.wait(0);
            toastSuccess('Abort transaction', 'Abort transaction was mined');
        } catch (error: any) {
            if (error.code === 4001)
                return;
            console.error(error);
            toastError('Abort transaction', 'Error occured while processing abort transaction');
        } finally {
            setTransactionPending(false);
        }
    }

    return (
        <Flex justifyContent='center' alignItems='center' height='100%'>
            <Box>
                <StyledBackground>
                    <Flex flexDirection='column' justifyContent='center' alignItems='center' width='100%' padding='8px'>
                        <Text fontSize='18px' margin={margin}>Unfortunately nobody had accepted this game in time</Text>
                        <Button variant='info' type='button' onClick={onPromptModal}>Game context</Button>
                        <Text fontSize='18px' margin={margin}>Time until anyone can claim</Text>
                        <Countdown duration={duration} remaining={remaining.toNumber()} callback={callback} />
                        {
                            address === wrapper.game.challenger.adr &&
                            <>
                                <Text fontSize='18px' margin={margin}>As a challenger you still can abort and claim back pot</Text>
                                <Button variant='warning' disabled={transactionPending} onClick={abortGame} margin={margin}>
                                    Abort game
                                </Button>
                            </>
                        }
                    </Flex>
                </StyledBackground>
            </Box>
        </Flex>
    )
}

export default TimeoutWaitingForOpponent;