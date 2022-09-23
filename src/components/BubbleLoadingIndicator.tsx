import styled, { keyframes } from 'styled-components';

const animation = keyframes`
    0%, 60%, 100% {
        background: rgba(255, 255, 255, 0.25);
        transform: translateY(0);
    }
    20% {
        background: rgba(255, 255, 255, 0.75);
        transform: translateY(1rem);
    }
    40% {
        background: rgba(255, 255, 255, 0.75);
        transform: translateY(-1rem);
    }
`

const Container = styled.div<{ show: boolean }>`
    visibility: ${ ({ show }) => show ? 'visible' : 'hidden'};
    text-align: center;
    margin: 2% 0.5rem;
    & > span {
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        margin: 1rem 0.2rem;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 50%;
        transform: translateY(0);
        animation: ${animation} 2000ms infinite ease-in-out;
    }
    
    & > span:nth-child(1) {
        animation-delay: 0ms;
    }

    & > span:nth-child(2) {
        animation-delay: 150ms;
    }

    & > span:nth-child(3) {
        animation-delay: 300ms;
    }

    & > span:nth-child(4) {
        animation-delay: 450ms;
    }
`;

const BubbleLoadingIndicator = ({ show }: { show: boolean }) => {
    return (
        <Container show={show}>
            <span />
            <span />
            <span />
            <span />
        </Container>
    )
}

export default BubbleLoadingIndicator;