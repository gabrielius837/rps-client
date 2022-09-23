import { BigNumber } from "ethers";
import { Flex, Box } from "../../../components/Box";
import { Button } from "../../../components/Button";
import { Countdown } from "../../../components/Countdown";
import { MoveContext } from "../../../components/GameContext";
import { useInfoModal } from "../../../components/Modal";
import { Text } from "../../../components/Text";
import { useToast } from "../../../components/Toast";
import useStore from "../../../state";
import { RockPaperScissors } from "../../../typechain-types";
import StyledBackground from "../../StyledBackground";
import { Actor } from "../types";

interface Props {
    actor: Actor;
    gameId: BigNumber;
    contract: RockPaperScissors;
    wrapper: RockPaperScissors.GameWrapperStructOutput;
    callback: () => Promise<void>;
}

const getText = (actor: Actor): string => {
    switch (actor) {
        case Actor.winner:
            return 'Because other player failed to submit move in time you can now claim this game';
        case Actor.loser:
            return 'Because you did not submit move in time you lost this one :(';
        default:
            return 'Player did not submit move in time';
    }
}

const margin = '4px';

const TimeoutMove = ({ actor, gameId, contract, wrapper, callback }: Props) => {
    const { onPromptModal } = useInfoModal(<MoveContext wrapper={wrapper} />);
    const { toastError, toastSuccess } = useToast();
    const transactionPending = useStore(x => x.transactionPending);
    const setTransactionPending = useStore(x => x.setTransactionPending);

    const duration = wrapper.context.claimTimeout;
    const remaining = wrapper.game.updateTimestamp.add(duration).sub(wrapper.timestamp);

    const claim = async () => {
        try {
            setTransactionPending(true);
            const tx = await contract.claimPot(gameId);
            await tx.wait(0);
            toastSuccess('Claim transaction', 'You have successfully claimed victory in game');
            await callback();
        } catch (error: any) {
            if (error.code === 4001)
                return;
            console.error(error);
            toastError('Claim transaction', 'Error occured while trying to claim victory in game');
        } finally {
            setTransactionPending(false);
        }
    }
    return (
        <Flex justifyContent='center' alignItems='center' height='100%' margin='0 4px'>
            <Box>
                <StyledBackground>
                    <Flex flexDirection='column' justifyContent='center' alignItems='center' width='100%' padding='8px'>
                        <Box margin={margin}>
                            <Text fontSize='18px'>{getText(actor)}</Text>
                        </Box>
                        <Box margin={margin}>
                            <Text fontSize='18px'>Time left before anyone can claim</Text>
                        </Box>
                        <Box margin={margin}>
                            <Countdown duration={duration} remaining={remaining.toNumber()} callback={callback} />
                        </Box>
                        <Box margin={margin}>
                            <Button variant='info' onClick={onPromptModal}>Game context</Button>
                        </Box>
                        {actor === Actor.winner && <>

                            <Box margin={margin}>
                                <Text fontSize='18px'>Click below to claim</Text>
                            </Box>
                            <Box margin={margin}>
                                <Button onClick={claim} disabled={transactionPending} variant='success'>Claim</Button>
                            </Box>
                        </>}
                    </Flex>
                </StyledBackground>
            </Box>
        </Flex>
    )
}

export default TimeoutMove;