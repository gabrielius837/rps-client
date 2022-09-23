import styled from 'styled-components';

import WalletCard from './WalletCard';
import config from './config';
import { Login } from './types';
import { Box, Flex } from '../../Box';
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from '../styles';
import Heading from '../../Heading';

interface Props {
    login: Login;
    onDismiss?: () => void;
}

const WalletWrapper = styled(Box)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => {
    return (
        <ModalContainer minWidth="320px">
            <ModalHeader>
                <ModalTitle>
                    <Heading>Connect Wallet</Heading>
                </ModalTitle>
                <ModalCloseButton onDismiss={onDismiss} />
            </ModalHeader>
            <ModalBody width={["320px", null, "340px"]}>
                <WalletWrapper py='8px' maxHeight="453px" overflowY="auto">
                    <Flex flexDirection='column'>
                        {config.map((wallet) => (
                            <Box margin='4px 8px' key={wallet.title}>
                                <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
                            </Box>
                        ))}
                    </Flex>
                </WalletWrapper>
            </ModalBody>
        </ModalContainer>
    );
};

export default ConnectModal;
