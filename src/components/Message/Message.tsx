import React from "react";
import styled from "styled-components";
import { variant as systemVariant, space } from "styled-system";
import { MessageProps } from "./types";
import variants from "./theme";

const MessageContainer = styled.div<MessageProps>`
    display: flex;
    padding: 16px;
    border-radius: 16px;
    border: solid 1px;
    font-size: ${({ fontSize }) => fontSize || '16px'};
    width: ${({ width }) => width || 'auto'};
    ${space}
    ${systemVariant({
        variants,
    })}
`;


const Message: React.FC<MessageProps> = ({ children, variant, ...props }) => {
    return (
        <MessageContainer variant={variant} {...props}>
            {children}
        </MessageContainer>
    );
};

export default Message;
