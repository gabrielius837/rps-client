import { ReactNode } from 'react';

import useModal from '../useModal';
import InfoModal from './InfoModal';

interface ReturnType {
    onPromptModal: () => void;
}

const useInfoModal = (children?: ReactNode): ReturnType => {
    const [onPromptModal] = useModal(<InfoModal>{children}</InfoModal>);
    return { onPromptModal }
}

export default useInfoModal;