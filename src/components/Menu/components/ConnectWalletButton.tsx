import { useWalletModal } from '../../Modal';
import { Button } from '../../Button';
import useAuth from '../../../hooks/useAuth';

const ConnectWalletButton = ({ ...props }) => {
    const { login } = useAuth()
    const { onPresentConnectModal } = useWalletModal(login);

    return (
        <Button onClick={onPresentConnectModal} {...props}>
            Connect
        </Button>
    )
}

export default ConnectWalletButton;