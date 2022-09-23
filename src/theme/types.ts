//export type Breakpoints = string[];

export interface Breakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};

export interface MediaQueries {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    nav: string;
};

//export type Spacing = number[];

export interface Radii {
    small: string;
    default: string;
    card: string;
    circle: string;
};

export interface Shadows {
    active: string;
    success: string;
    warning: string;
    focus: string;
    inset: string;
}

export interface Colors {
    primary: string;
    secondary: string;
    tertiary: string;
    text: string;
    textSubtle: string;
    textDisabled: string;
    input: string;
    accept: string;
    decline: string;
    info: string;
    warning: string;
    background: string;
    backgroundDisabled: string;
    border: string;
    white: string;
};

export interface ZIndices {
    dropdown: number;
    modal: number;
};

export interface AppTheme {
    colors: Colors;
    //breakpoint: Breakpoints;
    mediaQueries: MediaQueries;
    shadows: Shadows;
    //spacing: Spacing;
    radii: Radii;
    zIndices: ZIndices;
}
