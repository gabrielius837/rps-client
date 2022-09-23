import { useEffect } from 'react';
import { connectorLocalStorageKey } from '../components/Modal/WalletModal/config';
import { ConnectorName } from '../components/Modal/WalletModal/types';
import { useAuth } from '../hooks';
import { isMobile } from 'react-device-detect';
import { injected } from '../utils/web3React';

const _ethereumListener = async () =>
    new Promise<void>((resolve) =>
        Object.defineProperty(window, 'ethereum', {
            get() {
                return this._eth;
            },
            set(_eth) {
                this._eth = _eth;
                resolve();
            },
        }),
    );

const safeGetLocalStorageItem = () => {
    try {
        return (
            typeof window?.localStorage?.getItem === 'function' &&
            (window?.localStorage?.getItem(connectorLocalStorageKey) as ConnectorName)
        )
    } catch (err: any) {
        // Ignore Local Storage Browser error
        // - NS_ERROR_FILE_CORRUPTED
        // - QuotaExceededError
        console.error(`Local Storage error: ${err?.message}`);
        return null;
    }
}

const useEagerConnect = () => {
    const { login } = useAuth()

    useEffect(() => {
        const tryLogin = (c: ConnectorName) => {
            setTimeout(() => login(c))
        }

        const connectorId = safeGetLocalStorageItem();

        if (connectorId) {
            // Prevent eager connect on mobile & coinbase wallet not injected, as it keeps trying deeplink to app store.
            if (connectorId === ConnectorName.WalletLink && isMobile && window?.ethereum?.isCoinbaseWallet !== true) {
                return
            }

            if (connectorId === ConnectorName.Injected) {
                const isEthereumDefined = Reflect.has(window, 'ethereum')

                // handle opera lazy inject ethereum
                if (!isEthereumDefined) {
                    _ethereumListener().then(() => tryLogin(connectorId))

                    return
                }
                // somehow injected login not working well on development mode
                injected.isAuthorized().then(() => tryLogin(connectorId))
            } else {
                tryLogin(connectorId)
            }
        } else {
            // Dapp browse will try login even is not authorized.
            injected.isAuthorized().then(() => {
                if (isMobile && window.ethereum) {
                    tryLogin(ConnectorName.Injected)
                }
            })
        }
    }, [login])
}

export default useEagerConnect
