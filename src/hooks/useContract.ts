import { Contract } from "@ethersproject/contracts"
import { Provider } from "@ethersproject/providers";
import { Signer, constants, utils } from "ethers";
import { useMemo } from "react";
import { RockPaperScissors, RockPaperScissors__factory } from '../typechain-types';
import staticRpcProvider from "../utils/staticRpcProvider";
import { getAddress } from '../config'
import useActiveWeb3React from "./useActiveWeb3React";
import { getProviderOrSigner } from "../utils";

function getContract(address: string, ABI: any, signer?: Signer | Provider | null): Contract {
    if (!utils.isAddress(address) || address === constants.AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, signer ?? staticRpcProvider)
}

function useContract<T extends Contract = Contract>(
    address: string,
    ABI: any,
    withSignerIfPossible = true,
): T | null {
    const { library, account } = useActiveWeb3React()
    const signer = useMemo(
        () => (library && withSignerIfPossible ? getProviderOrSigner(library, account) : null),
        [withSignerIfPossible, library, account],
    )

    const canReturnContract = useMemo(
        () => address && ABI && (withSignerIfPossible ? library : true),
        [address, ABI, library, withSignerIfPossible],
    )

    return useMemo(() => {
        if (!canReturnContract) return null
        try {
            return getContract(address, ABI, signer)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, signer, canReturnContract]) as T
}

export const useRockPaperScissorsContract = (forceSigner: boolean = true) => {
    return useContract<RockPaperScissors>(
        getAddress('RockPaperScissors'),
        RockPaperScissors__factory.abi,
        forceSigner
    );
}
