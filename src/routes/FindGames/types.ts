import { BigNumber } from "ethers";
import { RockPaperScissors } from "../../typechain-types";

export interface IndexedGame {
    id: BigNumber;
    key: string;
    game: RockPaperScissors.GameStructOutput
}