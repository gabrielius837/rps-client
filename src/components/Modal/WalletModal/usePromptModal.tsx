import useModal from '../useModal';
import PromptModal from './PromptModal';

interface ReturnType {
    onPromptModal: () => void;
}

const useWalletModal = (logout: () => void): ReturnType => {
    const [onPromptModal] = useModal(<PromptModal logout={logout}/>);
    return { onPromptModal }
}

export default useWalletModal;