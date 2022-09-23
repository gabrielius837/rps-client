import create, { GetState, SetState } from 'zustand';
import { createCurrentGameSlice, CurrentGameSlice } from './currentGame';
import { createTransactionSlice, TransactionSlice } from './transaction';

type Store =
    TransactionSlice &
    CurrentGameSlice

export type StoreSlice<T extends {}> = (
    set: SetState<Store>,
    get: GetState<Store>
) => T;

const useStore = create<Store>((set, get) => ({
    ...createTransactionSlice(set, get),
    ...createCurrentGameSlice(set, get)
}));

export default useStore;