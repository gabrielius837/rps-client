import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { v4 as uuid } from 'uuid';

import { Text } from '../Text';
import { formatCountdown } from './utils';

interface Props {
    duration: number;
    remaining: number;
    callback: () => void;
}

const Countdown = ({ duration, remaining, callback }: Props) => {
    const [key, setKey] = useState(uuid());

    useEffect(() => {
        setKey(uuid());
    }, [remaining]);

    return (
        <CountdownCircleTimer
            key={key}
            isPlaying
            initialRemainingTime={remaining}
            duration={duration}
            colors='#33539e'
            onComplete={callback}
            size={120}
        >
            {({ remainingTime }) => <Text fontSize='24px'>{formatCountdown(remainingTime)}</Text>}
        </CountdownCircleTimer>
    )
};

export default Countdown;
