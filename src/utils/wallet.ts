import { network, CHAIN_ID } from '../config';
import { ExternalProvider } from '@ethersproject/providers'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (externalProvider?: ExternalProvider): Promise<boolean> => {
    const provider = externalProvider || window.ethereum
    if (!network) {
        console.error('Invalid chain id')
        return false
    }
    if (provider && provider.request) {
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
            })
            return true
        } catch (switchError) {
            if ((switchError as any)?.code === 4902) {
                try {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: `0x${CHAIN_ID}`,
                                chainName: network.chainName,
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'bnb',
                                    decimals: 18,
                                },
                                rpcUrls: [ network.http ],
                                blockExplorerUrls: [ network.explorerUrl ],
                            },
                        ],
                    })
                    return true
                } catch (error) {
                    console.error('Failed to setup the network in Metamask:', error)
                    return false
                }
            }
            return false
        }
    } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
        return false
    }
}
