import ToastContainer from './ToastContainer';
import useToast from './useToast';

const ToastListener = () => {
    const { toasts, remove } = useToast()

    const handleRemove = (id: string) => remove(id)

    return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}

export default ToastListener;