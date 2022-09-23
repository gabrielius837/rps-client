import {
    Metamask,
    CoinbaseWallet,
    WalletConnect
} from './icons';
import { Config, ConnectorName } from './types';

const connectors: Config[] = [
    {
        title: 'Metamask',
        icon: Metamask,
        connectorId: ConnectorName.Injected,
    },
    {
        title: "WalletConnect",
        icon: WalletConnect,
        connectorId: ConnectorName.WalletConnect,
    },
    {
        title: "Coinbase Wallet",
        icon: CoinbaseWallet,
        connectorId: ConnectorName.WalletLink,
    },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";

export const walletConnectConfig = connectors.find((c) => c.title === "WalletConnect");
