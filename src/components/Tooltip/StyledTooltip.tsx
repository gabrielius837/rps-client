import styled from "styled-components";
import { m as Motion } from "framer-motion";

export const Arrow = styled.div`
    &,
    &::before {
        position: absolute;
        width: 10px;
        height: 10px;
        z-index: 1;
    }

    &::before {
        content: "";
        transform: rotate(45deg);
        background: ${({ theme }) => theme.colors.background};
    }
`;

export const StyledTooltip = styled(Motion.div)`
    padding: 8px;
    font-size: 16px;
    line-height: 130%;
    border-radius: 8px;
    max-width: 320px;
    z-index: 101;
    border: solid 1px ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    overflow-wrap: break-word;

    &[data-popper-placement^="top"] > ${Arrow} {
        bottom: -6px;
    }

    &[data-popper-placement^="top"] > ${Arrow}::before {
        border-right: solid 1px ${({ theme }) => theme.colors.primary};
        border-bottom: solid 1px ${({ theme }) => theme.colors.primary};
    }

    &[data-popper-placement^="bottom"] > ${Arrow} {
        top: -6px;
    }

    &[data-popper-placement^="bottom"] > ${Arrow}::before {
        border-top: solid 1px ${({ theme }) => theme.colors.primary};
        border-left: solid 1px ${({ theme }) => theme.colors.primary};
    }

    &[data-popper-placement^="left"] > ${Arrow} {
        right: -6px;
    }

    &[data-popper-placement^="left"] > ${Arrow}::before {
        border-right: solid 1px ${({ theme }) => theme.colors.primary};
        border-top: solid 1px ${({ theme }) => theme.colors.primary};
    }

    &[data-popper-placement^="right"] > ${Arrow} {
        left: -6px;
    }

    &[data-popper-placement^="right"] > ${Arrow}::before {
        border-left: solid 1px ${({ theme }) => theme.colors.primary};
        border-bottom: solid 1px ${({ theme }) => theme.colors.primary};
    }
`;
