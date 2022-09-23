import { BigNumber, constants, utils } from "ethers";
import { hexlify, keccak256 } from "ethers/lib/utils";
import { useForm } from "react-hook-form";

import { Message } from "../../../components/Message";
import { Flex } from "../../../components/Box";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useToast } from "../../../components/Toast";
import { Box } from "../../../components/Box";
import useStore from "../../../state";
import { RockPaperScissors } from "../../../typechain-types";
import { readMove, removeMove } from "../../../utils/moveCaching";
import { getPlayer } from "../utils";
import { useEffect } from "react";

interface Props {
    address: string;
    gameId: BigNumber;
    contract: RockPaperScissors;
    wrapper: RockPaperScissors.GameWrapperStructOutput;
    callback: () => Promise<void>;
}

interface FormData {
    move: string;
}

const margin = '8px auto';

const isValidated = (wrapper: RockPaperScissors.GameWrapperStructOutput, address: string): boolean => {
    const player = getPlayer(wrapper.game, address);
    if (!player)
        return false;

    return player.move !== constants.HashZero;
}

const ValidateController = ({ address, gameId, contract, wrapper, callback }: Props) => {
    const moveContext = { address, gameId, round: wrapper.game.round }
    const { toastError, toastSuccess, toastInfo } = useToast();
    const transactionPending = useStore(x => x.transactionPending);
    const setTransactionPending = useStore(x => x.setTransactionPending);
    const move = readMove(moveContext);
    const { setValue, trigger, getValues, register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            move
        },
        reValidateMode: 'onChange',
        mode: 'onChange'
    });

    useEffect(() => {
        setValue('move', move);
    }, [address]);

    useEffect(() => {
        trigger();
    }, []);

    const validateMove = (): boolean => {
        const moveValue = getValues('move');
        if (!utils.isHexString(moveValue))
            return false;
        const hash = wrapper.game.challenger.adr === address ? wrapper.game.challenger.hashedMove : wrapper.game.opponent.hashedMove;
        return keccak256(hexlify(moveValue)) === hash;
    }

    const submit = async (data: FormData) => {
        try {
            setTransactionPending(true);
            const gasPrice = await contract.provider.getGasPrice();
            const overrides = { gasLimit: 180128, gasPrice: gasPrice.add(1000000000) }
            const tx = await contract.submitMove(gameId, data.move, overrides);
            await tx.wait(0);
            toastSuccess('Validate move transaction', 'Validate transaction was mined');
            await callback();
            removeMove(moveContext);
        } catch (error: any) {
            if (error.code === 4001)
                return;

            console.error(error);
            toastError('Validate move transaction', 'Error occurred while processing validate transaction');
        } finally {
            setTransactionPending(false);
        }
    }

    const surrender = async () => {
        try {
            setTransactionPending(true);
            const tx = await contract.surrenderGame(gameId);
            toastInfo('Surrender transaction', 'Surrender transaction was submitted');
            await tx.wait(0);
            toastSuccess('Surrender transaction', 'Surrender transaction was mined');
        } catch (error: any) {
            if (error.code === 4001)
                return;

            console.error(error);
            toastError('Surrender transaction', 'Error occurred while processing surrender transaction');
        } finally {
            setTransactionPending(false);
        }
    }

    const validated = isValidated(wrapper, address);

    return (
        <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
            <Flex flexDirection='column' justifyContent='center' alignItems='center' width='100%' padding='8px'>
                <Box padding='4px'>
                    <Input isWarning={!!errors.move} disabled={transactionPending || !!!errors.move} maxLength={67} {...register('move', { validate: validateMove })} />
                </Box>
                <Box padding='4px'>
                    {errors.move && <Message margin={margin} width='100%' variant='danger'>Cached move value does not match hash, enter new one</Message>}
                </Box>
                <Flex>
                    <Button type='submit' disabled={transactionPending || validated} variant='success'>Validate move</Button>
                    <Box width='16px'/>
                    <Button type='button' disabled={transactionPending} variant='warning' onClick={surrender}>Surrender</Button>
                </Flex>
            </Flex>
        </form>
    )
}

export default ValidateController;