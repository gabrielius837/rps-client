import { Box, Flex } from '../../Box';
import styled from 'styled-components';
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from '../styles';
import Heading from '../../Heading';
import { Text } from '../../Text';
import { Button } from '../../Button';

interface Props {
    logout: () => void;
    onDismiss?: () => void;
}

const Wrapper = styled(Box)`
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PromptModal: React.FC<Props> = ({ logout, onDismiss = () => null }) => {
    return (
        <ModalContainer minWidth="320px">
            <ModalHeader>
                <ModalTitle>
                    <Heading>Disconnect Wallet</Heading>
                </ModalTitle>
                <ModalCloseButton onDismiss={onDismiss} />
            </ModalHeader>
            <ModalBody width={["320px", null, "340px"]}>
                <Wrapper py='8px' maxHeight="453px" overflowY="auto">
                    <Flex flexDirection='column'>
                        <Text textAlign='center' fontSize='18px' padding='16px'>
                            Are you sure you want to disconnect your wallet?
                        </Text>
                        <Flex width='100%' justifyContent='center'>
                            <Button 
                                onClick={() => {
                                    logout();
                                    onDismiss();
                                }}
                                margin='8px'
                                variant='success'
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={onDismiss}
                                margin='8px'
                                variant='warning'
                            >
                                No
                            </Button>
                        </Flex>
                    </Flex>
                </Wrapper>
            </ModalBody>
        </ModalContainer>
    );
};

export default PromptModal;
