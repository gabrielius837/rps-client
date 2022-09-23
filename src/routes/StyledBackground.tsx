import { ReactNode } from 'react';
import styled from 'styled-components';
import { Box } from '../components/Box';

const Background = styled(Box)`
    border-radius: 8px;
    left: 0;
    top: 0;
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
`

interface Props {
    children?: ReactNode;
}

const StyledBackground = ({ children }: Props) => {
    return (
        <Box position='relative' width='100%'>
            <Background />
            {children}
        </Box>
    )
}

export default StyledBackground;