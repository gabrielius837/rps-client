import { connectorLocalStorageKey } from '../components/Modal/WalletModal/config';
import { connectorsByName } from './web3React';
import { LS_ORDERS } from './localStorageOrders';
import getLocalStorageItemKeys from './getLocalStorageItemKeys';

export const clearUserStates = (isDeactive = false) => {
    const { localStorage } = window;
    if (!localStorage)
        return;
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (localStorage.getItem('walletconnect')) {
        connectorsByName.walletconnect.close();
        connectorsByName.walletconnect.walletConnectProvider = undefined;
    }
    // Only clear localStorage when user disconnect,switch address no need clear it.
    if (isDeactive) {
        localStorage.removeItem(connectorLocalStorageKey);
    }
    const lsOrderKeys = getLocalStorageItemKeys(LS_ORDERS);
    for (const lsOrderKey of lsOrderKeys)
    {
        if (!lsOrderKey)
            continue;
        localStorage.removeItem(lsOrderKey);
    }
}
