import { useState, useEffect, ReactNode, useMemo } from "react";
import { CSSTransition } from "react-transition-group";

import './Fade.css';

interface Props {
    value: string;
    children: ReactNode
}

const Fade = ({ value, children }: Props) => {
    const [tick, setTick] = useState(false);

    useEffect(() => {
        setTick(x => !x);
    }, [value]);

    const fade = useMemo(() => {
        return (
            <FadeAnimation tick={tick}>
                {children}
            </FadeAnimation>
        )
    }, [tick, children]);

    return fade;
}

interface AnimationProps {
    tick: boolean;
    children: ReactNode;
}

const FadeAnimation = ({ tick, children }: AnimationProps) => {
    return (<CSSTransition
        in={tick}
        appear={false}
        timeout={1000}
        classNames='fade'
        unmountOnExit={false}
    >
        {children}
    </CSSTransition>
    )
}

export default Fade;