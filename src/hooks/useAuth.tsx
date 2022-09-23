import { useCallback } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { connectorLocalStorageKey } from '../components/Modal/WalletModal/config';
import { ConnectorName } from '../components/Modal/WalletModal/types';
import { Text } from '../components/Text';
import { Box } from '../components/Box';
import { connectorsByName } from '../utils/web3React';
import { setupNetwork } from '../utils/wallet';
import { useToast } from '../components/Toast';
import { clearUserStates } from '../utils/clearUserStates';

const useAuth = () => {
    const { activate, deactivate, setError } = useWeb3React();
    const { toastError } = useToast();

    const login = useCallback(
        async (connectorID: ConnectorName) => {
            const connectorOrGetConnector = connectorsByName[connectorID];
            const connector =
                typeof connectorOrGetConnector !== 'function' ? connectorsByName[connectorID] : await connectorOrGetConnector();

            if (typeof connector !== 'function' && connector) {
                activate(connector, async (error: Error) => {
                    if (error instanceof UnsupportedChainIdError) {
                        setError(error);
                        const provider = await connector.getProvider();
                        const hasSetup = await setupNetwork(provider);
                        if (hasSetup) {
                            activate(connector);
                        }
                    } else {
                        window?.localStorage?.removeItem(connectorLocalStorageKey)
                        if (error instanceof NoEthereumProviderError) {
                            toastError(
                                'Provider Error',
                                <Box>
                                    <Text>No provider was found</Text>
                                </Box>,
                            )
                        } else if (
                            error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof UserRejectedRequestErrorWalletConnect
                        ) {
                            if (connector instanceof WalletConnectConnector) {
                                const walletConnector = connector as WalletConnectConnector;
                                walletConnector.walletConnectProvider = undefined;
                            }
                            toastError('Authorization Error', 'Please authorize to access your account');
                        } else {
                            toastError(error.name, error.message);
                        }
                    }
                });
            } else {
                window?.localStorage?.removeItem(connectorLocalStorageKey)
                toastError('Unable to find connector', 'The connector config is wrong');
            }
        },
        [activate, toastError, setError],
    );

    const logout = useCallback(() => {
        deactivate();
        clearUserStates(true);
    }, [deactivate]);

    return { login, logout }
}

export default useAuth
