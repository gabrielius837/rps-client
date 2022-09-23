/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlexProps } from '../Box';
import { DropdownMenuItemType } from '../DropdownMenu';
import { SvgProps } from '../Svg';

export type SubMenuItemsType = {
    label: string;
    href: string;
    itemProps?: any;
    icon?: React.FC<SvgProps>;
    isMobileOnly?: boolean;
    type?: DropdownMenuItemType;
};

export interface SubMenuItemsProps extends FlexProps {
    items: SubMenuItemsType[];
    activeItem?: string;
    isMobileOnly?: boolean;
}
