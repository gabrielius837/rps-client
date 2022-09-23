import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Box, BoxProps, Flex } from '../Box';
import Logo from './components/Logo';
import {
    MENU_HEIGHT,
    links
} from './config';
import { MenuItems } from '../MenuItems';
import { getActiveMenuItem, getActiveSubMenuItem } from '../../utils/activeMenuItem';
import UserMenu from './components/UserMenu';
import { DisplayWrapper } from '../DisplayWrapper';
import BurgerButton from './components/BurgerButton';
import MobileMenu from './components/MobileMenu';

interface WrapperProps extends BoxProps {
    open: boolean;
    children?: ReactNode;
}

const Wrapper = (props: WrapperProps) => {
    const { open, children, ...rest } = props;
    return <StyledWrapper
        overflowY={open ? 'hidden' : 'auto'}
        {...rest}
    >{children}</StyledWrapper> 
}

const StyledWrapper = styled(Box)`
    position: relative;
    flex-grow: 1;
    width: 100%;
    max-width: 1800px;
`;

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${MENU_HEIGHT}px;
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    transform: translate3d(0, 0, 0);

    padding-left: 16px;
    padding-right: 16px;
`;

const FixedContainer = styled.div<{ height: number }>`
    position: fixed;
    top: 0;
    left: 0;
    transition: top 0.2s;
    height: ${({ height }) => `${height}px`};
    width: 100%;
    z-index: 20;
`;

interface Props {
    path: string;
    children?: React.ReactNode;
}

const Menu: React.FC<Props> = ({
    path,
    children
}) => {
    const activeMenuItem = getActiveMenuItem(path, links);
    const activeSubMenuItem = getActiveSubMenuItem(path, activeMenuItem);
    const activeItem = activeMenuItem?.href;
    const activeSubItem = activeSubMenuItem?.href;

    const [open, setOpen] = useState(false);

    return (
        <>
            <FixedContainer height={MENU_HEIGHT}>
                <StyledNav>
                    <Flex>
                        <Logo href='/' />
                        <DisplayWrapper isDesktop={true}>
                            <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml='12px' />
                        </DisplayWrapper>
                    </Flex>
                    <Flex alignItems='center' height='100%'>
                        <UserMenu />
                        <DisplayWrapper isDesktop={false}>
                            <Flex height='100%' justifyContent='center' marginLeft='8px'>
                                <BurgerButton open={open} callback={() => setOpen(open => !open)} />
                            </Flex>
                        </DisplayWrapper>
                    </Flex>
                </StyledNav>
            </FixedContainer>
            <Wrapper overflowX='hidden' open={open} margin={`${MENU_HEIGHT + 1}px auto 0`}>
                {children}
                <MobileMenu items={links} activeItem={activeItem} activeSubItem={activeSubItem} open={open} callback={() => setOpen(false)}/>
            </Wrapper>
        </>

    );
};

export default Menu;
