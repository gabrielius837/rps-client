/// <reference types='react-scripts' />
interface Window {
    ethereum?: {
        isMetaMask?: true;
        isCoinbaseWallet?: true;
        request: (params: { method: string; params?: anyp[] }) => Promise<void>;
    };
}
