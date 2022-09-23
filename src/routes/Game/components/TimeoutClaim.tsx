import { BigNumber } from "ethers";
import { Box, Flex } from "../../../components/Box";
import { Button } from "../../../components/Button";
import { Text } from "../../../components/Text";
import { useToast } from "../../../components/Toast";
import useStore from "../../../state";
import { RockPaperScissors } from "../../../typechain-types";
import StyledBackground from "../../StyledBackground";

interface Props {
    wrapper: RockPaperScissors.GameWrapperStructOutput,
    gameId: BigNumber,
    contract: RockPaperScissors,
    callback: () => Promise<void>
}

const margin = '4px';

const TimeoutClaim = ({ wrapper, gameId, contract, callback }: Props) => {
    const { toastError, toastSuccess } = useToast();
    const transactionPending = useStore(x => x.transactionPending);
    const setTransactionPending = useStore(x => x.setTransactionPending);

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
        <Flex justifyContent='center' alignItems='center' height='100%'>
            <Box>
                <StyledBackground>
                    <Flex flexDirection='column' justifyContent='center' alignItems='center' padding='8px'>
                        <Box margin={margin}>
                            <Text fontSize='18px'>Lucky for you a player didn't claim this game so now you can!</Text>
                        </Box>
                        <Box margin={margin}>
                            <Button variant='info'>Game context</Button>
                        </Box>
                        <Box margin={margin}>
                            <Button onClick={claim} disabled={transactionPending} variant='success'>Claim</Button>
                        </Box>
                    </Flex>
                </StyledBackground>
            </Box>
        </Flex >
    )
}

export default TimeoutClaim;