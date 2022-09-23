export const headingTags = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
} as const;

export const headingSizes = {
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
    XXL: 'xxl',
} as const;

export type HeadingTag = typeof headingTags[keyof typeof headingTags];
export type HeadingSize = typeof headingSizes[keyof typeof headingSizes];

export interface HeadingProps {
    as?: HeadingTag;
    size?: HeadingSize;
    center?: boolean;
}