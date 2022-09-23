import React from "react";
import styled from "styled-components";
import { Flex } from "../../../components/Box";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";
import { useAuth } from "../../../hooks";
import { usePromptModal } from "../../Modal";
import spliceAddress from "../../../utils/spliceAddress";

export const StyledUserMenu = styled(Flex)`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.tertiary};
    border-radius: 16px;
    box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: inline-flex;
    height: 32px;
    padding-left: 40px;
    padding-right: 8px;
    position: relative;

    &:hover {
        opacity: 0.65;
    }
`;

export const LabelText = styled.div`
    color: ${({ theme }) => theme.colors.text};
    //display: none;
    font-weight: 600;
    display: block;
    margin-left: 8px;
    margin-right: 4px;
    /*
    ${({ theme }) => theme.mediaQueries.sm} {
        display: block;
        margin-left: 8px;
        margin-right: 4px;
    }
    */
`;

const UserState: React.FC<UserMenuProps> = ({
    account,
    text,
    variant = variants.DEFAULT,
    children,
    ...props
}) => {
    const { logout } = useAuth();
    const { onPromptModal } = usePromptModal(logout);
    const accountEllipsis = spliceAddress(account);

    return (
        <Flex alignItems="center" height="100%" {...props} onClick={onPromptModal}>
            <StyledUserMenu>
                <MenuIcon variant={variant} />
                <LabelText title={text || account}>{text || accountEllipsis}</LabelText>
            </StyledUserMenu>
        </Flex>
    );
};

export default UserState;
