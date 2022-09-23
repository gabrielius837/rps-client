import { BigNumber } from "ethers";

export interface KeyContext {
    address: string;
    gameId: BigNumber;
    round: number;
}

export interface MoveContext extends KeyContext {
    move: string;
}

const getKey = (context: KeyContext) => {
    return `${context.address}:${context.gameId.toString()}:${context.round}`;
}

const readMove = (context: KeyContext): string => {
    const key = getKey(context);
    return window.localStorage.getItem(key) ?? '';
}

const writeMove = (context: MoveContext): void => {
    const key = getKey(context);
    window.localStorage.setItem(key, context.move);
}

const removeMove = (context: KeyContext): void => {
    const key = getKey(context);
    window.localStorage.removeItem(key);
}

export { readMove, writeMove, removeMove }