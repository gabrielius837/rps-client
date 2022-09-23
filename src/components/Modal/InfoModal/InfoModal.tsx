import { ReactNode } from 'react';
import { Box } from '../../Box';
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from '../styles';
import Heading from '../../Heading';

interface Props {
    children?: ReactNode;
    onDismiss?: () => void;
}

const ConnectModal: React.FC<Props> = ({ children, onDismiss = () => null }) => {
    return (
        <ModalContainer minWidth="320px">
            <ModalHeader>
                <ModalTitle>
                    <Heading>Game context</Heading>
                </ModalTitle>
                <ModalCloseButton onDismiss={onDismiss} />
            </ModalHeader>
            <ModalBody width={["320px", null, "340px"]}>
                <Box padding='8px' margin='0 auto'>
                    {children}
                </Box>
            </ModalBody>
        </ModalContainer>
    );
};

export default ConnectModal;
