import { useEffect } from 'react';
import { clearUserStates } from '../utils/clearUserStates';
import useActiveWeb3React from './useActiveWeb3React';

const useAccountEventListener = () => {
    const { account, chainId, connector } = useActiveWeb3React();

    useEffect(() => {
        if (account && connector) {
            const handleUpdateEvent = () => {
                clearUserStates();
            }

            const handleDeactiveEvent = () => {
                clearUserStates(true);
            }

            connector.addListener('Web3ReactDeactivate', handleDeactiveEvent);
            connector.addListener('Web3ReactUpdate', handleUpdateEvent);

            return () => {
                connector.removeListener('Web3ReactDeactivate', handleDeactiveEvent);
                connector.removeListener('Web3ReactUpdate', handleUpdateEvent);
            }
        }
    }, [account, chainId, connector]);
}

export default useAccountEventListener;
