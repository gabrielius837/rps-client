import React, { createElement } from 'react';
import { Box } from '../Box';
import { DropdownMenuItemType } from '../DropdownMenu/types';
import { MenuItem } from '../MenuItem';
import { OpenNewIcon } from '../Svg';
import StyledSubMenuItems from './styles';
import { SubMenuItemsProps } from './types';

const SubMenuItems: React.FC<SubMenuItemsProps> = ({ items = [], activeItem, isMobileOnly = false, ...props }) => {
    return (
        <StyledSubMenuItems
            justifyContent={[isMobileOnly ? 'flex-end' : 'start', null, 'center']}
            {...props}
            pl={['12px', null, '0px']}
            $isMobileOnly={isMobileOnly}
        >
            {items.map(({ label, href, icon, itemProps, type }) => {
                const isExternalLink = type === DropdownMenuItemType.EXTERNAL_LINK;
                const linkProps = isExternalLink
                    ? {
                        as: 'a',
                        target: '_blank',
                    }
                    : {};

                return (
                    label && (
                        <Box key={label} mr='20px'>
                            <MenuItem href={href} isActive={href === activeItem} variant='subMenu' {...itemProps} {...linkProps}>
                                {icon && createElement(icon, { color: href === activeItem ? 'secondary' : 'text', mr: '4px'})}
                                {label}
                                {isExternalLink && (
                                    <Box display={['none', null, 'flex']} style={{ alignItems: 'center' }} ml='4px'>
                                        <OpenNewIcon color='text' />
                                    </Box>
                                )}
                            </MenuItem>
                        </Box>
                    )
                );
            })}
        </StyledSubMenuItems>
    );
};

export default SubMenuItems;
