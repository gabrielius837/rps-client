import { cloneElement } from "react";
import styled from "styled-components";

import Input from "./Input";
import { Box } from "../Box";
import { InputGroupProps, scales, Scales } from "./types";

const getPadding = (scale: Scales, hasIcon: boolean) => {
    if (!hasIcon) {
        return "16px";
    }

    switch (scale) {
        case scales.SM:
            return "32px";
        case scales.LG:
            return "56px";
        case scales.MD:
        default:
            return "48px";
    }
};

const StyledInputGroup = styled(Box) <{ scale: Scales; hasIcon: boolean }>`
    ${Input} {
        padding-right: ${({ hasIcon, scale }) => getPadding(scale, hasIcon)};
    }
`;

const InputIcon = styled.div<{ scale: Scales; icon?: boolean }>`
    align-items: center;
    display: flex;
    height: 100%;
    position: absolute;
    top: 0;

    ${({ icon, scale }) =>
        icon
            ? `right: ${scale === scales.SM ? "8px" : "16px"};`
            : `left: ${scale === scales.SM ? "8px" : "16px"};`
    }
`;

const InputGroup = ({ scale = scales.MD, icon, children, ...props }: InputGroupProps): JSX.Element => (
    <StyledInputGroup
        scale={scale}
        width="100%"
        position="relative"
        hasIcon={!!icon}
        {...props}
    >
        {cloneElement(children, { scale })}
        {icon && (
            <InputIcon scale={scale} icon>
                {icon}
            </InputIcon>
        )}
    </StyledInputGroup>
);

export default InputGroup;
