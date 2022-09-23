import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';

interface Props {
    time?: number;
    title: string
    children: React.ReactNode;
    margin?: string;
    width?: string;
}

interface InnerProps {
    time: number;
    isOpen: boolean;
}

interface HeightProps extends InnerProps {
    height: string;
}

const Header = styled.div<InnerProps>`
    cursor: pointer;
    color: ${({ isOpen, theme }) => isOpen ? theme.colors.white : theme.colors.text};
    background-color: ${({ isOpen, theme }) => isOpen ? theme.colors.primary : 'inherit'};
    font-size: 20px;
    padding: 8px;
    transition: all ${({ time }) => time}ms ease-in-out;

    &::after {
        font-size: inherit;
        float: right;
        content: '\\2039';
        transition: transform ${({ time }) => time}ms ease-out;
        transform: rotate(${({ isOpen }) => isOpen ? -90 : 0}deg);
    }
`;

const BorderedBox = styled(Box)`
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div<HeightProps>`
    max-height: ${({ height, isOpen }) => isOpen ? height : 0};
    overflow: hidden;
    transition: max-height ${({ time }) => time}ms ease-out;
`

const Collapsible: React.FC<Props> = ({ time = 200, title, children, margin = 'auto', width = 'auto' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const onClick = () => setIsOpen(prevState => !prevState);
    return (
        <BorderedBox margin={margin} width={width}>
            <Header time={time} isOpen={isOpen} onClick={onClick}>
                {title}
            </Header>
            <Content ref={contentRef} height={`${contentRef.current ? contentRef.current.scrollHeight : 0}px`} time={time} isOpen={isOpen}>
                {children}
            </Content>
        </BorderedBox>
    )
}

export default Collapsible;