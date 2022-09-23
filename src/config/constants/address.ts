import { CHAIN_ID, ChainId } from "./network";

type Addresses = {
    [key in ChainId]: string;
};

interface AddressMap {
    RockPaperScissors: Addresses
}

export type ContractName = keyof AddressMap;

const contracts: AddressMap = {
    RockPaperScissors: {
        56:     '0x0000000000000000000000000000000000000000',
        97:     '0x2B9b3E418a0B5Aa0731D36FFc162fCCee7d27a8F',
        31337:   '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    }
}

const getAddress = (contractName: ContractName) => contracts[contractName][CHAIN_ID];

export default getAddress;