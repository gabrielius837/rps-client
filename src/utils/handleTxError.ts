import { ToastSignature } from "../components/Toast/types";

const handleTxError = (error: any, toast: ToastSignature) => {
    if (error.code === 4001)
        return;
}

export default handleTxError;