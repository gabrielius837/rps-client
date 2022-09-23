import { 
    MediaQueries,
    ZIndices,
    Colors,
    Radii,
    AppTheme,
    Shadows,/*, Breakpoints, Spacing */
    Breakpoints
} from './types';

export const colors: Colors = {
    primary: '#a5678e',
    secondary: '#e8b7d4',
    tertiary: '#7facd6',
    text: '#3e4544',
    textSubtle: '#b1b0b5',
    textDisabled: '#666666',
    input: '#eeeaf4',
    accept: '#42b883',
    decline: '#c51350',
    info: '#33539e',
    warning: '#c51350',
    background: '#f7f8fA',
    backgroundDisabled: '#bbbbbb',
    border: '#a5678e',
    white: '#ffffff'
}

export const breakpointMap: Breakpoints = {
    xs: 370,
    sm: 576,
    md: 852,
    lg: 968,
    xl: 1080,
};

//const breakpoints: Breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`);

export const mediaQueries: MediaQueries = {
    xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
    sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
    md: `@media screen and (min-width: ${breakpointMap.md}px)`,
    lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
    xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
    nav: `@media screen and (min-width: ${breakpointMap.lg}px)`,
};

//const spacing: Spacing = [0, 4, 8, 16, 24, 32, 48, 64];

export const shadows: Shadows = {
    active: "0px 0px 0px 1px #0098A1, 0px 0px 0px 3px rgba(31, 199, 212, 0.4)",
    success: "0px 0px 0px 1px #31D0AA, 0px 0px 0px 3px rgba(49, 208, 170, 0.2)",
    warning: "0px 0px 0px 1px #ED4B9E, 0px 0px 0px 3px rgba(237, 75, 158, 0.2)",
    focus: "0px 0px 0px 1px #7645D9, 0px 0px 0px 3px rgba(118, 69, 217, 0.6)",
    inset: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
};

const radii: Radii = {
    small: '4px',
    default: '16px',
    card: '32px',
    circle: '50%',
}

const zIndices: ZIndices = {
    dropdown: 10,
    modal: 100,
};

const theme: AppTheme = {
    colors,
    mediaQueries,
    shadows,
    radii,
    zIndices
}

export default theme;