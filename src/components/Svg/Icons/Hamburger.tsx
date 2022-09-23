import styled from 'styled-components';

import Svg from '../Svg';
import { SvgProps } from '../types';

interface Props extends SvgProps {
    active?: boolean;
}

const HamburgerSvg = styled(Svg)`
    cursor: pointer;
    transition: transform 400ms;
    user-select: none;

    &.active {
        transform: rotate(45deg);
    }

    > .line {
        fill:none;
        transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
        stroke:#000;
        strokeWidth:5.5;
        strokeLinecap:round;
    }

    > .line.top {
        stroke-dasharray: 40 121;
    }

    > .line.bottom {
        stroke-dasharray: 40 121;
    }

    &.active > .line.top {
        stroke-dashoffset: -68px;
    }

    &.active > .line.bottom {
        stroke-dashoffset: -68px;
    }
`;

const Icon: React.FC<Props> = ({ active = false, ...props }) => {
    return (
        <HamburgerSvg className={active ? 'active' : ''} viewBox='0 0 100 100' {...props}>
            <path className='line top' d='m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20' />
            <path className='line middle' d='m 70,50 h -40' />
            <path className='line bottom' d='m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20' />
        </HamburgerSvg>
    );
};

export default Icon;
