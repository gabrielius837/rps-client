import styled from 'styled-components';
import { space, typography } from 'styled-system';
import { TextProps } from './types';

const Text = styled.div<TextProps>`
    color: ${({ theme, color }) => color ? color : theme.colors.text };
    font-size: ${({ fontSize, small }) => small ? '14px' : fontSize || '16px'};
    font-weight: ${({ bold }) => (bold ? 600 : 400)};
    line-height: 1.1;
    ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
    ${space}
    ${typography}
`;

export default Text;