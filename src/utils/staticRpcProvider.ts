import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { network } from '../config'

const { http: RPC_URL } = network;

const staticRpcProvider = new StaticJsonRpcProvider(RPC_URL)

export default staticRpcProvider;