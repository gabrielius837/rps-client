import styled from 'styled-components';
import { Text } from '../Text';
import { headingTags, headingSizes, HeadingProps, HeadingSize } from './types';

interface HeadingStyle {
    fontSize: string;
    fontSizeLg: string;
}

type HeadingStyles = {
    [key in HeadingSize]: HeadingStyle
}

const styles: HeadingStyles = {
    [headingSizes.MD]: {
        fontSize: '20px',
        fontSizeLg: '20px',
    },
    [headingSizes.LG]: {
        fontSize: '24px',
        fontSizeLg: '24px',
    },
    [headingSizes.XL]: {
        fontSize: '32px',
        fontSizeLg: '40px',
    },
    [headingSizes.XXL]: {
        fontSize: '48px',
        fontSizeLg: '64px',
    },
};

const Heading = styled(Text)<HeadingProps>`
    text-align: ${({ center }) => center ? 'center' : 'initial'};
    font-size: ${({ size }) => styles[size || headingSizes.MD].fontSize};
    font-weight: 600;
    line-height: 1.1;
    ${({ theme }) => theme.mediaQueries.lg} {
        font-size: ${({ size }) => styles[size || headingSizes.MD].fontSizeLg};
    }
`;

Heading.defaultProps = {
    as: headingTags.H2
};

export default Heading;