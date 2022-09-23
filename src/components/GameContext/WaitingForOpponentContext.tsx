import { utils } from 'ethers';

import { TooltipLabel } from '../Tooltip';
import { RockPaperScissors } from "../../typechain-types";
import GameContextView from "./GameContextView";
import spliceAddress from '../../utils/spliceAddress';
import { noContext } from './utils';

interface Props {
    wrapper: RockPaperScissors.GameWrapperStructOutput | undefined;
}

const WaitingForOpponentContext = ({ wrapper }: Props) => {
    if (!wrapper)
        return noContext;

    return (
        <>
            <TooltipLabel tooltipText={wrapper.game.challenger.adr}>Challenger: {spliceAddress(wrapper.game.challenger.adr)}</TooltipLabel>
            <TooltipLabel tooltipText='Accept fee'>Pot: {utils.formatEther(wrapper.game.pot)} BNB</TooltipLabel>
            <GameContextView context={wrapper.context} />
        </>
    )
}

export default WaitingForOpponentContext;