import styled from 'styled-components';

import { Overlay } from "../../Overlay";
import type { MenuItemsType } from '../../MenuItems/types';
import isTouchDevice from '../../../utils/isTouchDevice';
import { StyledMenuItemProps } from '../../MenuItem/types';
import StyledMenuItem from '../../MenuItem/styles';
import { Aggregate } from '../../Aggregate';

const StyledMobileMenuItem = styled.div<StyledMenuItemProps>`
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;

    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: ${({ $isActive }) => ($isActive ? '800' : '400')};

    padding: 0 16px;
    height: 48px;

    ${({ $statusColor, theme }) =>
        $statusColor &&
        `
        &:after {
            content: '';
            border-radius: 100%;
            background: ${theme.colors[$statusColor]};
            height: 8px;
            width: 8px;
            margin-left: 12px;
        }
    `}
`;

interface StyledProps {
    open: boolean;
}

const StyledMenu = styled.div<StyledProps>`
    z-index: 21;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.white};
    width: 196px;
    height: 100%;
    top: 0;
    right: 0;
    transform: translateX(${({ open }) => open ? '0' : '197px'});
    transition: transform 150ms ease-in;
    border-left: 1px solid ${({ theme }) => theme.colors.primary};
`;

interface Props extends StyledProps {
    callback: () => void;
    items: MenuItemsType[];
    activeItem?: string;
    activeSubItem?: string;
}

const MobileMenu = ({ open, callback, items, activeItem, activeSubItem }: Props) => {
    return (
        <>
            {open && <Overlay onClick={callback} />}
            <StyledMenu open={open}>
                {
                    items.map(({ label, items: menuItems = [], href }) => {
                        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
                        const isActive = activeItem === href;
                        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
                        return (<Aggregate key={`${label}#${href}`}>
                            <StyledMobileMenuItem {...linkProps} $isActive={isActive} $statusColor={statusColor} $variant='subMenu'>
                                {label}
                            </StyledMobileMenuItem>
                                {
                                    menuItems.map(subItem => {
                                        const isSubActive = activeSubItem === subItem.href;
                                        return <StyledMenuItem key={`${subItem.label}#${subItem.href}`} href={subItem.href} $isActive={isSubActive} $variant='default'>
                                            {subItem.label}
                                        </StyledMenuItem>
                                    })
                                }
                        </Aggregate>);
                    })
                }
            </StyledMenu>
        </>
    )
}

export default MobileMenu;