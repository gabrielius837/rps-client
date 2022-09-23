import { BoxProps } from '../Box';
import { DropdownMenuItems } from '../DropdownMenu';

export type MenuItemsType = {
    label: string;
    href: string;
    items: DropdownMenuItems[];
    showOnMobile?: boolean;
    showItemsOnMobile?: boolean;
};

export interface MenuItemsProps extends BoxProps {
    items: MenuItemsType[];
    activeItem?: string;
    activeSubItem?: string;
}
