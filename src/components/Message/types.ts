import { SpaceProps } from "styled-system";

export const variants = {
    WARNING: "warning",
    DANGER: "danger",
    SUCCESS: "success",
} as const;

export type Variant = typeof variants[keyof typeof variants];

export interface MessageProps extends SpaceProps {
    variant: Variant;
    fontSize?: string;
    width?: string;
    children?: React.ReactNode;
}
