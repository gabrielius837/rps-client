import styled, { css, keyframes } from 'styled-components';
import { space } from 'styled-system';
import { SvgProps } from './types';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const spinStyle = css`
    animation: ${rotate} 2s linear infinite;
`;

const Svg = styled.svg<SvgProps>`
    fill: ${({ theme, color }) => color || theme.colors.primary};
    flex-shrink: 0;
    // xmlns: ${({ xmlns }) => xmlns || 'http://www.w3.org/2000/svg'};
    ${({ spin }) => spin && spinStyle}
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    ${space}
`;

export default Svg;
