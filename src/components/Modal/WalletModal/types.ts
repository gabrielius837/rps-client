import { FC } from 'react';
import { SvgProps } from '../../Svg';

export enum ConnectorName {
    Injected = 'injected',
    WalletConnect = 'walletconnect',
    WalletLink = 'walletlink'
}

export type Login = (connectorId: ConnectorName) => void;

export interface Config {
    title: string;
    icon: FC<SvgProps>;
    connectorId: ConnectorName;
    href?: string;
}
