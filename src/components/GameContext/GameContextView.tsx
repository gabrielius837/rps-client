import { GameContext } from "../../typechain-types"
import numberToTimeString from "../../utils/numberToTimeString";
import { TooltipLabel } from "../Tooltip";
import { Text } from '../Text';
import { noContext } from "./utils";

interface Props {
    context: GameContext.ContextDataStructOutput | undefined;
}

const GameContextView = ({ context }: Props) => {
    if (!context)
        return noContext;

    return (
        <>
            <TooltipLabel tooltipText='Time to accept this game'>Join timeout: {numberToTimeString(context.waitingForOpponentTimeout)}</TooltipLabel>
            <TooltipLabel tooltipText='Time to submit/validate move'>Move timeout: {numberToTimeString(context.moveTimeout)}</TooltipLabel>
            <TooltipLabel tooltipText='Time after which anyone can claim this game'>Claim timeout: {numberToTimeString(context.claimTimeout)}</TooltipLabel>
            <TooltipLabel tooltipText='Maximum score a player can achieve'>Score threshold: {context.scoreThreshold}</TooltipLabel>
            <TooltipLabel tooltipText='Maximum amount of rounds that can be played'>Round threshold: {context.roundThreshold}</TooltipLabel>
            <TooltipLabel tooltipText='A percentage of pot that owner is going receive'>Owner tip: {(context.ownerTipRate / 100).toFixed(2)}%</TooltipLabel>
            <TooltipLabel tooltipText='A percentage of pot that referral is going receive'>Referral tip: {(context.referralTipRate / 100).toFixed(2)}%</TooltipLabel>
        </>
    )
}

export default GameContextView;