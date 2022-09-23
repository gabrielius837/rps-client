import { RockPaperScissors } from "../../typechain-types";
import GameContextView from './GameContextView';
import { utils } from 'ethers';
import spliceAddress from "../../utils/spliceAddress";
import { TooltipLabel } from "../Tooltip";
import { noContext, reward } from './utils';

interface Props {
    wrapper: RockPaperScissors.GameWrapperStructOutput | undefined;
}

const MoveContext = ({ wrapper }: Props) => {
    if (!wrapper)
        return noContext;

    return (
        <>
            <TooltipLabel tooltipText='Reward for winning this game'>Pot: {utils.formatEther(reward(wrapper))} BNB</TooltipLabel>
            <TooltipLabel tooltipText='Current round'>Round: {wrapper.game.round}</TooltipLabel>
            <TooltipLabel tooltipText={wrapper.game.challenger.adr}>Challenger: {spliceAddress(wrapper.game.challenger.adr)}</TooltipLabel>
            <TooltipLabel tooltipText={wrapper.game.opponent.adr}>Challenger: {spliceAddress(wrapper.game.opponent.adr)}</TooltipLabel>
            <GameContextView context={wrapper.context} />
        </>
    )
}

export default MoveContext;
