import { memo, ReactNode } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import './Switch.css';

interface Props {
    value: string;
    children: ReactNode
}

const Switch = ({ value, children }: Props) => {
    return (
        <SwitchTransition mode='out-in'>
            <CSSTransition
                key={value}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames='switch'
                timeout={500}
            >
                {children}
            </CSSTransition>
        </SwitchTransition>
    )
}

export default memo(Switch, (prev, current) => prev.value === current.value && prev.children === current.children);