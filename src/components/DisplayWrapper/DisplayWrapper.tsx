import { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../../theme';

interface WrapperProps {
    isDesktop: boolean;
}

const Wrapper = styled.div<WrapperProps>`
    display: ${({ isDesktop }) => isDesktop ? 'none' : 'block'};

    ${mediaQueries.lg} {
        display: ${({ isDesktop }) => isDesktop ? 'block': 'none'};
    }
`;

interface Props extends WrapperProps {
    children: ReactNode;
}

const DisplayWrapper: FC<Props> = ({ isDesktop, children }) => {
    return (
        <Wrapper isDesktop={isDesktop}>
            {children}
        </Wrapper>
    )
}

export default DisplayWrapper;