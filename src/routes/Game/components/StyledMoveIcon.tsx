import styled from 'styled-components';
import { variant } from 'styled-system';

export const variants = {
    TAGGED: 'tagged',
    PLAIN: 'plain',
};

export type Variant = typeof variants[keyof typeof variants];

export const backgroundVariants = {
    [variants.TAGGED]: {
        background: 'linear-gradient(-45deg, #33539e, #7facd6, #bfb8da, #e8b7d4, #a5678e)',
        backgroundSize: '400% 400%',
        backgroundPosition: '50% 50%'
    },
    [variants.PLAIN]: {
        backgroundColor: 'rgba(51, 83, 158, 0.1)'
    }
}

interface Props {
    variant: Variant;
}

const StyledMoveIcon = styled.div<Props>`
    transition: background 500ms ease-in-out;
    border: 4px solid ${({ theme }) => theme.colors.secondary}; 
    border-radius: 8px;
    min-height: 48px;
    margin: 2px;
    min-width: 48px;
    aspect-ratio: 1 / 1;
    ${variant({
        variants: backgroundVariants
    })}
`;

export default StyledMoveIcon;
