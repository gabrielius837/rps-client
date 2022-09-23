import { MouseEvent } from 'react';
import styled from 'styled-components';

interface StyledProps {
    open: boolean;
}

export const StyledBurger = styled.button<StyledProps>`
    display: inline-block;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    border: none;
  
    &:focus {
        outline: none;
    }
  
    & > div {
        width: 35px;
        height: 5px;
        margin: 5px 0;
        transition: 0.4s;
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 3px;
    }

    & > div:first-child {
        transform: ${({ open }) => open ? 'rotate(-45deg) translate(-8px, 6px)' : 'rotate(0deg) translate(0, 0)'};
    }

    & > div:nth-child(2) {
        opacity: ${({ open }) => open ? '0' : '1'};
    }

    & > div:nth-child(3) {
        transform: ${({ open }) => open ? 'rotate(45deg) translate(-7px, -7px)' : 'rotate(0deg) translate(0, 0)'};
    }
`;

interface Props extends StyledProps {
    callback: (event?: MouseEvent<HTMLButtonElement>) => void;
}

const BurgerButton = ({ open, callback }: Props) => {
    return (
        <StyledBurger open={open} onClick={callback}>
            <div />
            <div />
            <div />
        </StyledBurger>
    )
}

export default BurgerButton;