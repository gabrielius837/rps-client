import React, { SVGAttributes } from 'react';
import { SpaceProps } from 'styled-system';
import { Colors } from '../../theme';

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
    spin?: boolean;
    width?: string;
    height?: string;
}

export type IconComponentType = {
    icon: React.FC<SvgProps>;
    fillIcon?: React.FC<SvgProps>;
    isActive?: boolean;
    height?: string;
    width?: string;
    activeColor?: string;
    activeBackgroundColor?: keyof Colors;
  } & SvgProps;

