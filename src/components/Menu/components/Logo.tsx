import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LogoTextIcon, LogoIcon } from '../../Svg';
import { Flex } from '../../../components/Box';

interface Props {
    href: string;
}

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    .mobile-icon {
        width: 48px;
        ${({ theme }) => theme.mediaQueries.nav} {
            display: block;
        }
    }
    .desktop-icon {
        width: 120px;
        margin: 0 8px;
        display: none;
        ${({ theme }) => theme.mediaQueries.nav} {
            display: block;
        }
    }
`;

const Logo: React.FC<Props> = ({ href }) => {
    const isAbsoluteUrl = href.startsWith('http');
    const innerLogo = (
        <>
            <LogoIcon className='mobile-icon' />
            <LogoTextIcon className='desktop-icon' />
        </>
    );

    return (
        <Flex>
            {isAbsoluteUrl ? (
                <StyledLink to={href}>
                    {innerLogo}
                </StyledLink>
            ) : (
                <StyledLink to={href}>
                    {innerLogo}
                </StyledLink>
            )}
        </Flex>
    );
};

export default Logo;
