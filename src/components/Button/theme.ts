import { scales, variants } from './types';
import type { Colors } from '../../theme/types';

export const scaleVariants = {
    [scales.MD]: {
        height: '48px',
        padding: '0 24px',
    },
    [scales.SM]: {
        height: '32px',
        padding: '0 16px',
    },
    [scales.XS]: {
        height: '20px',
        fontSize: '12px',
        padding: '0 8px',
    },
};

type ColorKey = keyof Colors;
type Variant = typeof variants[keyof typeof variants];

interface StyleVariant {
    backgroundColor: ColorKey;
    color: ColorKey;
}

type StyleVariants = {
    [key in Variant]: StyleVariant;
}

export const styleVariants: StyleVariants = {
    [variants.PRIMARY]: {
        backgroundColor: 'primary',
        color: 'white',
    },
    [variants.SECONDARY]: {
        backgroundColor: 'secondary',
        color: 'primary'
    },
    [variants.TERTIARY]: {
        backgroundColor: 'tertiary',
        color: 'primary',
    },
    [variants.SUCCESS]: {
        backgroundColor: 'accept',
        color: 'white',
    },
    [variants.WARNING]: {
        backgroundColor: 'decline',
        color: 'white',
    },
    [variants.INFO]: {
        backgroundColor: 'info',
        color: 'white'
    }
};