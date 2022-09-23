import { BoxProps } from "../../components/Box";

export interface InjectedProps {
  onDismiss?: () => void;
}

export interface ModalProps extends InjectedProps, BoxProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  headerBackground?: string;
  minWidth?: string;
}
