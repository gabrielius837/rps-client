import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { utils, constants, ContractReceipt, BigNumber } from 'ethers';
import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";
import { URLSearchParams } from 'url';

import { Input, InputGroup } from '../../components/Input';
import { ShowPasswordIcon } from '../../components/Svg';
import { Button } from '../../components/Button';
import { Flex, Box } from '../../components/Box';
import { Message } from '../../components/Message';
import { useToast } from '../../components/Toast';
import { TooltipLabel } from '../../components/Tooltip';
import { useActiveWeb3React, useRockPaperScissorsContract } from '../../hooks';
import type { GameContext, GameUpdatedEventObject } from '../../typechain-types/contracts/RockPaperScissors'
import useStore from '../../state';
import StyledBackground from '../StyledBackground';
import { useInfoModal } from '../../components/Modal';
import { GameContextView } from '../../components/GameContext';

interface FormData {
    usePassword: boolean;
    password: string;
    showPassword: boolean;
    usePot: boolean;
    pot: string;
    useReferral: boolean;
    referral: string;
}

const pattern = /^(\d{1,6})(\.|,)*(\d{1,18})?$/;
const validationPattern = /^\d{1,6}(\.\d{1,18})?$/;
const hexadecimalPattern = /^[0-9a-fA-F]{1,40}$/;

const handleDecimalInput = (event: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<FormData, "pot">) => {
    const { value } = event.target;
    const matches = value.match(pattern);
    let result = '';
    if (!matches) {
        if (value.length === 0)
            field.onChange(result);
        return;
    }

    if (matches[1]) result += matches[1];

    if (matches[2]) result += ".";

    if (matches[3]) result += matches[3];

    field.onChange(result);
}

const handleAddressInput = (event: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<FormData, "referral">) => {
    const { value } = event.target;
    let result = '';
    switch (value.length) {
        case 0:
            break;
        case 1:
            if (value === '0')
                result = '0';
            break;
        case 2:
            if (value === '0x')
                result = '0x';
            break;
        default:
            if (value.substring(0, 2) === '0x') {
                result = '0x';
                const sub = value.substring(2);
                if (sub.match(hexadecimalPattern))
                    result += sub;
            }

    }
    field.onChange(result);
}

const margin = '8px auto';

const resolveRef = (params: URLSearchParams): string | null => {
    const key = 'ref';
    const ref = params.get(key);
    if (ref && utils.isAddress(ref)) {
        window.localStorage.setItem(key, ref);
        return ref;
    }

    const storageRefStr = window.localStorage.getItem(key);
    return storageRefStr && utils.isAddress(storageRefStr) ? storageRefStr : null;
}

const getGameUpdatedEvent = (receipt: ContractReceipt, txHash: string): GameUpdatedEventObject | undefined => {
    if (!receipt.events || receipt.events.length < 1) {
        console.error('GameUpdated event was not found', receipt);
        return undefined;
    }
    const event = receipt.events.find(event => event.event === 'GameUpdated' && event.transactionHash === txHash);
    if (!event) {
        console.error('GameUpdated event was not found', receipt);
        return undefined;
    }

    if (!event.args ||
        !(event.args.gameId instanceof BigNumber) ||
        typeof (event.args.state) !== 'number') {
        console.error('Invalid GameUpdated event args', event);
        return undefined;
    }
    return { gameId: event.args.gameId, state: event.args.state }
}

const NewGame = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { error } = useActiveWeb3React();
    const ref = useMemo(() => resolveRef(searchParams), [searchParams]);
    const contract = useRockPaperScissorsContract(true);
    const transactionPending = useStore(x => x.transactionPending);
    const setTransactionPending = useStore(x => x.setTransactionPending);
    const { toastSuccess, toastError } = useToast();
    const submit = useCallback((data: FormData) => {
        if (!contract) {
            console.error('contract is null');
            toastError('Error', 'Could not submit transaction, make sure you\'re connected');
            return;
        }
        const passwordHash = data.usePassword ? keccak256(toUtf8Bytes(data.password)) : constants.HashZero;
        const pot = data.usePot ? utils.parseUnits(data.pot) : constants.HashZero;
        const referral = data.useReferral ? data.referral : constants.AddressZero;
        setTransactionPending(true);
        contract.startNewGame(referral, passwordHash, { value: pot })
            .then(async (tx) => {
                const receipt = await tx.wait(0);
                const event = getGameUpdatedEvent(receipt, tx.hash);
                if (!event) {
                    toastError('Error', 'Failed to retrieve game id');
                    return;
                }
                toastSuccess('Successful transaction', 'A new game was created');
                navigate(`/game?id=${event.gameId.toString()}`);
            })
            .catch(error => {
                // tx rejected by the user
                if (error.code === 4001)
                    return;
                console.error(error);
                toastError('Error', 'Problem occured while starting a new game');
            })
            .finally(() => setTransactionPending(false));
    }, [contract]);

    const { control, register, handleSubmit, setValue, getValues, watch, trigger, formState: { errors } } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            usePassword: false,
            password: '',
            showPassword: false,
            usePot: false,
            pot: '',
            useReferral: Boolean(ref),
            referral: ref ? ref : ''
        }
    });

    const [gameContext, setGameContext] = useState<GameContext.ContextDataStructOutput>();
    const { onPromptModal } = useInfoModal(<GameContextView context={gameContext} />);

    useEffect(() => {
        if (!contract || error)
            return;
        contract.getCurrentContext()
            .then(context => setGameContext(context))
            .catch(error => {
                console.error(error);
                toastError('Fetch error', 'Error occured while trying to fetch game context');
            });
    }, [contract, toastError, error]);

    const togglePasswordVisibility = () => {
        const showPassword = watch('showPassword');
        setValue('showPassword', !showPassword);
    }

    const validatePassword = (): boolean => {
        const usePassword = getValues('usePassword');
        const password = getValues('password');
        const isValid = !usePassword || password.length > 0;
        return isValid;
    }

    const validatePot = (): boolean => {
        const usePot = getValues('usePot');
        const pot = getValues('pot');
        return !usePot || validationPattern.test(pot);
    }

    const validateReferral = async (): Promise<boolean> => {
        const useReferral = getValues('useReferral');
        const referral = getValues('referral');
        const validAddress = utils.isAddress(referral);
        const isReferral = validAddress && !!contract && await contract.referrals(referral);
        return !useReferral ||
            (
                referral.length === 42 &&
                validAddress &&
                isReferral
            );
    }

    const registerUsePassword = register('usePassword');
    const registerUsePot = register('usePot');
    const registerUseReferral = register('useReferral');

    return (
        <Flex justifyContent='center' alignItems='center' width='100%' height='100%'>
            <form onSubmit={handleSubmit(submit)}>
                <StyledBackground>
                    <Box padding='16px'>
                    <TooltipLabel tooltipText='To make this game private you can use password'>Password</TooltipLabel>
                    <Flex flexDirection='row' m={margin}>
                        <Flex justifyContent='center' alignItems='center' width='40px' height='40px' margin='0 8px 0 0'>
                            <Input
                                scale='xs'
                                width='24px'
                                type='checkbox'
                                {...registerUsePassword}
                                onChange={(e) => {
                                    registerUsePassword.onChange(e);
                                    trigger('password');
                                }}
                            />
                        </Flex>
                        <InputGroup icon={<ShowPasswordIcon width='32px' onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />}>
                            <Input isWarning={Boolean(errors.password)} maxLength={20} disabled={!watch('usePassword')} {...register('password', { validate: validatePassword })} type={getValues('showPassword') ? 'text' : 'password'} />
                        </InputGroup>
                    </Flex>
                    {errors.password && <Message margin={margin} variant='warning'>Password is required</Message>}

                    <TooltipLabel tooltipText='If you want to wager enter an amount'>Pot</TooltipLabel>
                    <Flex flexDirection='row' margin={margin}>
                        <Flex justifyContent='center' alignItems='center' width='40px' height='40px' margin='0 8px 0 0'>
                            <Input
                                scale='xs'
                                width='24px'
                                type='checkbox'
                                {...registerUsePot}
                                onChange={(e) => {
                                    registerUsePot.onChange(e);
                                    trigger('pot');
                                }}
                            />
                        </Flex>
                        <Controller
                            name='pot'
                            control={control}
                            rules={{
                                validate: validatePot
                            }}
                            render={({ field }) => <Input {...field} isWarning={Boolean(errors.pot)} disabled={!getValues('usePot')} onChange={e => handleDecimalInput(e, field)} />}
                        />
                    </Flex>
                    {errors.pot && <Message margin={margin} variant='warning'>Valid pot amount is required</Message>}

                    <TooltipLabel tooltipText='Fill in an address of someone who helped you find this game'>Referral</TooltipLabel>
                    <Flex flexDirection='row' margin={margin}>
                        <Flex justifyContent='center' alignItems='center' width='40px' height='40px' margin='0 8px 0 0'>
                            <Input
                                scale='xs'
                                width='24px'
                                type='checkbox'
                                {...registerUseReferral}
                                onChange={(e) => {
                                    registerUseReferral.onChange(e);
                                    trigger('referral');
                                }}
                            />
                        </Flex>
                        <Controller
                            name='referral'
                            control={control}
                            rules={{
                                validate: validateReferral
                            }}
                            render={({ field }) => <Input maxLength={42} {...field} isWarning={Boolean(errors.referral)} disabled={!getValues('useReferral')} onChange={e => handleAddressInput(e, field)} />}
                        />
                    </Flex>
                    {errors.referral && <Message margin={margin} variant='warning'>Existing referral address is required</Message>}

                    <Flex justifyContent='center' alignItems='center' width='100%' margin='16px auto'>
                        <Button type='button' onClick={onPromptModal} variant='info'>Game context</Button>
                    </Flex>
                    <Flex justifyContent='center' alignItems='center' width='100%' margin='8px 0 auto'>
                        <Button
                            variant='success'
                            type='submit'
                            disabled={Object.keys(errors).length > 0 || transactionPending}
                        >Create new game</Button>
                    </Flex>
                    </Box>
                </StyledBackground>
            </form>
        </Flex>
    )
}

export default memo(NewGame);