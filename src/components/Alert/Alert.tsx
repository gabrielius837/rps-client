import styled, { DefaultTheme } from 'styled-components';
import {
    CheckmarkCircleIcon,
    ErrorIcon,
    BlockIcon,
    InfoIcon
} from '../Svg';
import { Text } from '../Text';
import { IconButton } from '../Button';
import { CloseIcon } from '../Svg';
import Flex from '../Box/Flex';
import { AlertProps, variants } from './types';

interface ThemedIconLabel {
    variant: AlertProps['variant'];
    theme: DefaultTheme;
    hasDescription: boolean;
}

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
    switch (variant) {
        case variants.DANGER:
            return theme.colors.decline;
        case variants.WARNING:
            return theme.colors.warning;
        case variants.SUCCESS:
            return theme.colors.accept;
        case variants.INFO:
        default:
            return theme.colors.info;
    }
};

const getIcon = (variant: AlertProps['variant'] = variants.INFO) => {
    switch (variant) {
        case variants.DANGER:
            return BlockIcon;
        case variants.WARNING:
            return ErrorIcon;
        case variants.SUCCESS:
            return CheckmarkCircleIcon;
        case variants.INFO:
        default:
            return InfoIcon;
    }
};

const IconLabel = styled.div<ThemedIconLabel>`
    background-color: ${getThemeColor};
    border-radius: 8px 0 0 8px;
    color: ${({ theme }) => theme.colors.white};
    padding: 12px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Details = styled.div`
    flex: 1;
    padding: 12px;
`;

const CloseHandler = styled.div`
    border-radius: 0 8px 8px 0;
    margin: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledAlert = styled(Flex)`
    position: relative;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 16px;
    box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
`;

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
    const Icon = getIcon(variant);

    return (
        <StyledAlert>
            <IconLabel variant={variant} hasDescription={!!children}>
                <Icon color='currentColor' width='24px' />
            </IconLabel>
            <Details>
                <Text bold>{title}</Text>
                {typeof children === 'string' ? <Text as='p'>{children}</Text> : children}
            </Details>
            {onClick && (
                <CloseHandler>
                    <IconButton scale='sm' variant='text' onClick={onClick}>
                        <CloseIcon width='24px' color='currentColor' />
                    </IconButton>
                </CloseHandler>
            )}
        </StyledAlert>
    );
};

export default Alert;
