import { ReactNode } from "react";
import { Link } from 'react-router-dom';

import { Flex } from "../../../components/Box";
import { Text } from "../../../components/Text";
import { FinishedContext } from "../../../components/GameContext";
import { useInfoModal } from "../../../components/Modal";
import { CongratulationsIcon, ExclamationIcon } from "../../../components/Svg";
import { RockPaperScissors } from "../../../typechain-types";
import { Actor } from "../types";
import { Card } from "./Card";

const getText = (actor: Actor): ReactNode => {
    switch (actor) {
        case Actor.winner:
            return <>Congratulations, you have won, click <Link to='/withdraw'>here</Link> to redeem</>
        case Actor.loser:
            return 'Unfortunately you have lost, better luck next time';
        case Actor.observer:
            return 'This game is over';
        default:
            return 'This game has been aborted';
    }
}

const getIcon = (actor: Actor): ReactNode => {
    const length = '160px';
    return actor === Actor.winner ? <CongratulationsIcon width={length} height={length} /> : <ExclamationIcon width={length} height={length} />
}

interface Props {
    actor: Actor;
    wrapper: RockPaperScissors.GameWrapperStructOutput;
}

const Finished = ({ actor, wrapper }: Props) => {
    const { onPromptModal } = useInfoModal(<FinishedContext wrapper={wrapper} />);
    return <Flex alignItems='center' justifyContent='center' width='100%' height='100%'>
            <Card length={256}>
                {getIcon(actor)}
                <Text textAlign='center' fontSize='20px' onClick={onPromptModal}>{getText(actor)}</Text>
            </Card>
        </Flex>
}

export default Finished;