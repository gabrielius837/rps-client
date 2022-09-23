import { Login } from '../Modal/WalletModal/types';
import { SvgProps } from '../Svg';

export interface LangType {
    code: string;
    language: string;
}

export interface PushedProps {
    isPushed: boolean;
    pushNav: (isPushed: boolean) => void;
}

export interface NavTheme {
    background: string;
    hover: string;
}

export interface MenuSubEntry {
    label: string;
    href: string;
    calloutClass?: string;
}

export interface MenuEntry {
    label: string;
    icon: React.FC<SvgProps>;
    items?: MenuSubEntry[];
    href?: string;
    calloutClass?: string;
    initialOpenState?: boolean;
}

export interface PanelProps {
    links: MenuEntry[];
}

export interface NavProps extends PanelProps {
    account?: string;
    login: Login;
    logout: () => void;
}
