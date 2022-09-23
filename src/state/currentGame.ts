import { BigNumber } from 'ethers';
import { RockPaperScissors } from '../typechain-types';
import { StoreSlice } from './store';

export interface CurrentGameSlice {
    gameWrapper: RockPaperScissors.GameWrapperStructOutput | undefined;
    setGameWrapper: (wrapper: RockPaperScissors.GameWrapperStructOutput | undefined) => void;
    updateGameWrapper: (contract: RockPaperScissors, gameId: BigNumber) => void;
}

export const createCurrentGameSlice: StoreSlice<CurrentGameSlice> = (set, get) => ({
    gameWrapper: undefined,
    setGameWrapper: (wrapper) => {
        set(() => ({
            gameWrapper: wrapper
        }));
    },
    updateGameWrapper: (contract, gameId) => {
        contract.getGame(gameId)
            .then(wrapper => set(() => ({
                gameWrapper: wrapper
            })))
            .catch(error => console.error(error))
    }
})