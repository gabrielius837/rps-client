import { StoreSlice } from './store';

export interface TransactionSlice {
    transactionPending: boolean;
    setTransactionPending: (flag: boolean) => void;
}

export const createTransactionSlice: StoreSlice<TransactionSlice> = (set, get) => ({
    transactionPending: false,
    setTransactionPending: (flag: boolean) => set(() => ({ transactionPending: flag }))
})