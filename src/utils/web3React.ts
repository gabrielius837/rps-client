import { Web3Provider, ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ConnectorName } from '../components/Modal/WalletModal/types';
import { CHAIN_ID, network } from '../config';

const POLLING_INTERVAL = 12000;
const rpcUrl = network.http;

export const injected = new InjectedConnector({ supportedChainIds: [CHAIN_ID] });

const walletconnect = new WalletConnectConnector({
    rpc: { [CHAIN_ID]: rpcUrl },
    qrcode: true
});

export const connectorsByName = {
    [ConnectorName.Injected]: injected,
    [ConnectorName.WalletConnect]: walletconnect,
    [ConnectorName.WalletLink]: async () => {
        const { WalletLinkConnector } = await import('@web3-react/walletlink-connector')
        return new WalletLinkConnector({
            url: rpcUrl,
            appName: 'Crypto-rps',
            appLogoUrl: `${window.location.origin}/logo512.png`,
            supportedChainIds: [CHAIN_ID],
        })
    },
} as const;

export const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(provider, CHAIN_ID);
    library.pollingInterval = POLLING_INTERVAL;
    return library;
}
