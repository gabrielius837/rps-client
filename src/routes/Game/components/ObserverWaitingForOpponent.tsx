import { BigNumber, constants } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { useForm } from "react-hook-form";

import { Flex, Box } from "../../../components/Box";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { Countdown } from "../../../components/Countdown";
import { Input, InputGroup } from "../../../components/Input";
import { Message } from "../../../components/Message";
import { ShowPasswordIcon } from "../../../components/Svg";
import { useToast } from "../../../components/Toast";
import useStore from "../../../state";
import { RockPaperScissors } from "../../../typechain-types";
import StyledBackground from "../../StyledBackground";
import { useInfoModal } from "../../../components/Modal";
import { WaitingForOpponentContext } from "../../../components/GameContext";

interface Props {
    gameId: BigNumber;
    contract: RockPaperScissors;
    wrapper: RockPaperScissors.GameWrapperStructOutput;
    callback: () => Promise<void>;
}

interface FormData {
    password: string;
    showPassword: boolean;
}

const margin = '8px auto';

const ObserverWaitingForOpponent = ({ gameId, contract, wrapper, callback }: Props) => {
    const { toastSuccess, toastError } = useToast();
    const setTransactionPending = useStore(x => x.setTransactionPending);
    const transactionPending = useStore(x => x.transactionPending);
    const { onPromptModal } = useInfoModal(<WaitingForOpponentContext wrapper={wrapper} />);
    const { handleSubmit, register, watch, getValues, setValue, formState: { errors } } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            password: '',
            showPassword: false
        }
    });

    const duration = wrapper.context.waitingForOpponentTimeout;
    const remaining = wrapper.game.updateTimestamp.add(duration).sub(wrapper.timestamp);

    const togglePasswordVisibility = () => {
        const showPassword = watch('showPassword');
        setValue('showPassword', !showPassword);
    }

    const validatePassword = (): boolean => {
        if (wrapper.game.passwordHash === constants.HashZero)
            return true;
        const password = getValues('password');
        const isValid = keccak256(toUtf8Bytes(password)) === wrapper.game.passwordHash;
        return isValid;
    }

    const submit = async (data: FormData) => {
        try {
            setTransactionPending(true);
            const password = wrapper.game.passwordHash === constants.HashZero ? '' : data.password;
            const tx = await contract.acceptGame(gameId, password, { value: wrapper.game.pot });
            await tx.wait(0);
            toastSuccess('Accept transaction', 'Accept transaction was mined');
            await callback();
        } catch (error: any) {
            if (error.code === 4001)
                return;
            console.error(error);
            toastError('Accept transaction', 'Error occured while processing accept transaction');
        } finally {
            setTransactionPending(false);
        }
    }

    return (
        <Flex justifyContent='center' alignItems='center' height='100%' width='100%' margin='0 4px'>
            <form onSubmit={handleSubmit(submit)}>
                <StyledBackground>
                    <Flex flexDirection='column' justifyContent='center' alignItems='center' width='100%' padding='8px'>
                        <Text fontSize='18px' margin={margin}>A new game has been created</Text>
                        <Button type='button' variant='info' onClick={onPromptModal}>Game context</Button>
                        <Text fontSize='18px' margin={margin}>Time left to accept</Text>
                        <Box margin={margin}>
                            <Countdown duration={duration} remaining={remaining.toNumber()} callback={callback} />
                        </Box>
                        {wrapper.game.passwordHash !== constants.HashZero &&
                            <>
                                <Text fontSize='18px' margin={margin}>You need password to accept this game</Text>
                                <InputGroup margin={margin} icon={<ShowPasswordIcon width='32px' onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />}>
                                    <Input isWarning={Boolean(errors.password)} disabled={transactionPending} maxLength={20} {...register('password', { validate: validatePassword })} type={getValues('showPassword') ? 'text' : 'password'} />
                                </InputGroup>
                                {errors.password && <Message margin={margin} width='100%' variant='danger'>Password is incorrect</Message>}
                            </>
                        }
                        <Button
                            margin={margin}
                            variant='success'
                            type='submit'
                            disabled={!!errors.password || transactionPending}
                        >Accept game</Button>
                    </Flex>
                </StyledBackground>
            </form >
        </Flex >
    )
}

export default ObserverWaitingForOpponent;