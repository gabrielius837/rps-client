import React from 'react';
import StyledMenuItem, { StyledMenuItemContainer } from './styles';
import { MenuItemProps } from './types';

const MenuItem: React.FC<MenuItemProps> = ({
    children,
    href,
    isActive = false,
    variant = 'default',
    statusColor,
    ...props
}) => {

    return (
        <StyledMenuItemContainer $isActive={isActive} $variant={variant}>
            <StyledMenuItem $isActive={isActive} $variant={variant} $statusColor={statusColor} {...props}>
                {children}
            </StyledMenuItem>
        </StyledMenuItemContainer>
    );
};

export default MenuItem;
