import styled, { keyframes } from 'styled-components';

import { RockIcon, PaperIcon, ScissorsIcon } from '../../components/Svg';

const rotateFrame = keyframes`
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const openTop = keyframes`
    0% {
        transform: translate3d(-50%, 0, 0);
        animation-timing-function: cubic-bezier(0.8, 0, 0.1, 1);
    }
    40% {
        transform: translate3d(-50%, -50%, 0);
        animation-timing-functon: cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
    70% {
        transform: translate3d(-50%, -50%, 0);
        animation-timing-functon: cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
    100% {
        transform: translate3d(-50%, 0, 0);
        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
`;

const openBottom = keyframes`
    0% {
        transform: translate3d(-50%, 0, 0);
        animation-timing-function: cubic-bezier(0.8, 0, 0.1, 1);
    }
    40% {
        transform: translate3d(-50%, 50%, 0);
        animation-timing-functon: cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
    70% {
        transform: translate3d(-50%, 50%, 0);
        animation-timing-functon: cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
    100% {
        transform: translate3d(-50%, 0, 0);
        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335);
    }
`;

const Container = styled.div`
    position: relative;
    overflow: hidden;
    animation-delay: 0.625s;
    aspect-ratio: 1 / 1;
    max-height: 656px;
    max-width: 656px;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const Shutters = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events: none;
    z-index: 2;
    animation: ${rotateFrame} 20s linear infinite;

    &:before, &:after {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        background: linear-gradient(-45deg, #33539e, #7facd6, #bfb8da, #e8b7d4, #a5678e);

        pointer-events: none;
        height: 200%;
        width: 200%;
    }

    &:before {
        bottom: 50%;
        animation: ${openTop} 5s infinite;
    }

    &:after {
        top: 50%;
        animation: ${openBottom} 5s infinite;
    }
`

const showHideSlide = keyframes`
    0% {
        opacity: 1;
        pointer-events: none;
        z-index: 1;
    }
    33% {
        opacity: 0;
        pointer-events: none;
        z-index: -1;
    }
    100% {
        opacity: 0;
        pointer-events: none;
        z-index: -1;
    }   
`

const Slides = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #bfb8da; 
`

const Slide = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    animation: ${showHideSlide} infinite 15s steps(1);

    &:nth-child(1) {
        animation-delay: 0s;
    }

    &:nth-child(2) {
        animation-delay: 5s;
    }

    &:nth-child(3) {
        animation-delay: 10s;
    }
`

const AnimatedLogo = () => {
    return (
        <Container>
            <Slides>
                <Slide>
                    <RockIcon />
                </Slide>
                <Slide>
                    <PaperIcon />
                </Slide>
                <Slide>
                    <ScissorsIcon />
                </Slide>
            </Slides>
            <Shutters />
        </Container>
    )
}

export default AnimatedLogo;