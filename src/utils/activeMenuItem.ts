import orderBy from 'lodash/orderBy'
import type { MenuItemsType } from '../components/MenuItems'

export const getActiveMenuItem = (path: string, menuConfig: MenuItemsType[]) => {
    return menuConfig.find((menuItem) => path.startsWith(menuItem.href) || getActiveSubMenuItem(path, menuItem));
}

export const getActiveSubMenuItem = (path: string, menuItem?: MenuItemsType) => {
    if (!menuItem || !menuItem.items)
        return undefined;
    const activeSubMenuItems = menuItem.items.filter((subMenuItem) => path.startsWith(subMenuItem.href)) ?? [];

    // Pathname doesn't include any submenu item href - return undefined
    if (!activeSubMenuItems || activeSubMenuItems.length === 0) {
        return undefined;
    }

    // Pathname includes one sub menu item href - return it
    if (activeSubMenuItems.length === 1) {
        return activeSubMenuItems[0];
    }

    // Pathname includes multiple sub menu item hrefs - find the most specific match
    const mostSpecificMatch = orderBy(activeSubMenuItems, (subMenuItem) => subMenuItem.href.length, 'desc')[0];

    return mostSpecificMatch;
}
