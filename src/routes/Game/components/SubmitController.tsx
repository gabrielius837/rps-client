import { BigNumber, constants, utils } from "ethers";
import { keccak256, hexlify } from "ethers/lib/utils";
import { ChangeEvent, useState } from "react";

import { readMove, writeMove } from '../../../utils/moveCaching';
import { Flex } from "../../../components/Box";
import { Button } from "../../../components/Button";
import CopyToClipboard from "../../../components/CopyToClipboard";
import useStore from "../../../state";
import { RockPaperScissors } from "../../../typechain-types";
import MoveRadio from "./MoveRadio";
import { getPlayer } from "../utils";
import { useToast } from "../../../components/Toast";

interface Props {
    gameId: BigNumber;
    address: string;
    wrapper: RockPaperScissors.GameWrapperStructOutput
    contract: RockPaperScissors;
    callback: () => Promise<void>;
}

const isUnsignedInteger = (value: string): boolean => {
    var numValue = Math.floor(Number(value));
    return numValue !== Infinity && String(numValue) === value && numValue >= 0;
}

const wrapMove = (move: number): string => {
    const buffer = new Uint8Array(32);
    window.crypto.getRandomValues(buffer);
    buffer[31] = (buffer[31] && 0xfd) | (move % 4);
    const result = utils.hexlify(buffer);
    return result;
}

const isSubmitted = (wrapper: RockPaperScissors.GameWrapperStructOutput, address: string): boolean => {
    const player = getPlayer(wrapper.game, address);

    if (!player)
        return false;
    
    return player.hashedMove !== constants.HashZero;
}

const margin = '4px auto';

const SubmitController = ({ gameId, address, wrapper, contract, callback }: Props) => {
    const moveContext = { address, gameId, round: wrapper.game.round }
    const [move, setMove] = useState<string>(readMove(moveContext));
    const { toastSuccess, toastError } = useToast();
    const setTransactionPending = useStore(x => x.setTransactionPending);
    const transactionPending = useStore(x => x.transactionPending);

    const setMoveValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        const moveValue = isUnsignedInteger(value) ? Number(value) : 0;
        const wrappedMove = wrapMove(moveValue);
        setMove(wrappedMove);
    }

    // todo
    const submitMove = async () => {
        if (!move)
            return;
        try {
            setTransactionPending(true);
            const gasPrice = await contract.provider.getGasPrice();
            const overrides = { gasLimit: 67482, gasPrice: gasPrice.add(1000000000) }
            const tx = await contract.submitHashedMove(gameId, keccak256(hexlify(move)), overrides);
            writeMove({ address, gameId, round: wrapper.game.round, move })
            await tx.wait(0);
            toastSuccess('Submit move transaction', 'Submit move transaction was mined');
            await callback();
        } catch (error: any) {
            if (error.code === 4001)
                return;
            console.error(error);
            toastError('Submit move transaction', 'Error occurred while processing submit move transaction');
        } finally {
            setTransactionPending(false);
        }
    }

    const submitted = isSubmitted(wrapper, address)

    // todo
    const surrender = async () => {
        try {
            setTransactionPending(true);
            const tx = await contract.surrenderGame(gameId);
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

    return (
        <Flex flexDirection='column' height='100%' width='100%'>
                <MoveRadio callback={setMoveValue} disabled={submitted || transactionPending}/>
            <Flex justifyContent='center' margin={margin}>
                <CopyToClipboard toCopy={move}>Current move value</CopyToClipboard>
            </Flex>
            <Flex margin={margin}>
                <Button variant='success' disabled={!move || transactionPending || submitted} onClick={submitMove}>Submit move</Button>
                <Button ml='16px' variant='warning' disabled={transactionPending} onClick={surrender}>Surrender</Button>
            </Flex>
        </Flex>
    )
}

export default SubmitController;