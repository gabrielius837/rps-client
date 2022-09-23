import React from "react";
import styled from "styled-components";
import { Variant, variants } from "./types";
import { RefreshIcon, WalletIcon, WarningIcon } from "../../../components/Svg";
import { Colors } from "../../../theme";

const MenuIconWrapper = styled.div<{ borderColor: keyof Colors }>`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme, borderColor }) => theme.colors[borderColor]};
    border-radius: 50%;
    border-style: solid;
    border-width: 2px;
    display: flex;
    height: 40px;
    justify-content: center;
    left: 0;
    position: absolute;
    top: -4px;
    width: 40px;
    z-index: 102;
`;

export const NoProfileMenuIcon: React.FC = () => (
    <MenuIconWrapper borderColor="primary">
        <WalletIcon color="primary" width="24px" />
    </MenuIconWrapper>
);

export const PendingMenuIcon: React.FC = () => (
    <MenuIconWrapper borderColor="secondary">
        <RefreshIcon color="secondary" width="24px" spin />
    </MenuIconWrapper>
);

export const WarningMenuIcon: React.FC = () => (
    <MenuIconWrapper borderColor="warning">
        <WarningIcon color="warning" width="24px" />
    </MenuIconWrapper>
);

export const DangerMenuIcon: React.FC = () => (
    <MenuIconWrapper borderColor="decline">
        <WarningIcon color="failure" width="24px" />
    </MenuIconWrapper>
);

const MenuIcon: React.FC<{ variant: Variant }> = ({ variant }) => {
    if (variant === variants.DANGER) {
        return <DangerMenuIcon />;
    }

    if (variant === variants.WARNING) {
        return <WarningMenuIcon />;
    }

    if (variant === variants.PENDING) {
        return <PendingMenuIcon />;
    }

    return <NoProfileMenuIcon />;
};

export default MenuIcon;
