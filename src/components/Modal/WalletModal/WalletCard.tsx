import styled from 'styled-components';
import { Button } from '../../Button';
import { Text } from '../../Text';
import { connectorLocalStorageKey, walletLocalStorageKey } from './config';
import { Config, Login } from './types';

interface Props {
    walletConfig: Config;
    login: Login;
    onDismiss: () => void;
}

const WalletButton = styled(Button).attrs({ width: "100%", variant: "text", py: "16px" })`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
`;

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
    const { title, icon: Icon } = walletConfig;
    return (
        <WalletButton
            variant="tertiary"
            onClick={() => {
                if (!window.ethereum && walletConfig.href) {
                    window.open(walletConfig.href, "_blank", "noopener noreferrer");
                } else {
                    login(walletConfig.connectorId);
                    localStorage?.setItem(walletLocalStorageKey, walletConfig.title);
                    localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId);
                    onDismiss();
                }
            }}
            id={`wallet-connect-${title.toLocaleLowerCase()}`}
        >
            <Icon width="40px" mb="8px" />
            <Text fontSize="14px">{title}</Text>
        </WalletButton>
    );
};

export default WalletCard;
