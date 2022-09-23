import { constants, utils } from 'ethers';

import { RockPaperScissors } from "../../typechain-types";
import { Text } from '../Text';
import GameContextView from './GameContextView';
import { TooltipLabel } from "../Tooltip";
import spliceAddress from "../../utils/spliceAddress";
import { noContext, reward } from './utils';

interface Props {
    wrapper: RockPaperScissors.GameWrapperStructOutput | undefined;
}

const FinishedContext = ({ wrapper }: Props) => {
    if (!wrapper)
        return noContext;

    return (
        <>
            <TooltipLabel tooltipText={wrapper.game.winner}>Winner: {spliceAddress(wrapper.game.winner)}</TooltipLabel>
            <TooltipLabel tooltipText='An amount that was won'>Winnings: {utils.formatEther(reward(wrapper))} BNB</TooltipLabel>
            <TooltipLabel tooltipText={wrapper.game.challenger.adr}>Challenger: {spliceAddress(wrapper.game.challenger.adr)}</TooltipLabel>
            <TooltipLabel tooltipText={wrapper.game.opponent.adr}>Opponent: {spliceAddress(wrapper.game.opponent.adr)}</TooltipLabel>
            <GameContextView context={wrapper.context} />
        </>
    )
}

export default FinishedContext;
