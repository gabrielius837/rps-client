import { Flex } from '../Box';
import isTouchDevice from '../../utils/isTouchDevice';
import { DropdownMenu } from '../DropdownMenu';
import { MenuItem } from '../MenuItem';
import { MenuItemsProps } from './types';

const MenuItems: React.FC<MenuItemsProps> = ({ items = [], activeItem, activeSubItem, ...props }) => {
    return (
        <Flex {...props}>
            {items.map(({ label, items: menuItems = [], href }) => {
                const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
                const isActive = activeItem === href;
                const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
                return (
                    <DropdownMenu key={`${label}#${href}`} items={menuItems} py={1} activeItem={activeSubItem}>
                        <MenuItem {...linkProps} isActive={isActive} statusColor={statusColor}>
                            {label}
                        </MenuItem>
                    </DropdownMenu>
                );
            })}
        </Flex>
    );
};

export default MenuItems;