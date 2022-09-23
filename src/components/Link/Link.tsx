import styled from 'styled-components';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import { Text } from '../Text';
import { LinkProps } from './types';

const StyledLink = styled(Text)<LinkProps>`
    display: flex;
    align-items: center;
    width: fit-content;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Link: React.FC<LinkProps> = ({ external, ...props }) => {
    const internalProps = external ? getExternalLinkProps() : {};
    return <StyledLink as='a' bold {...internalProps} {...props} />;
};

Link.defaultProps = {
    color: 'primary',
};

export default Link;
