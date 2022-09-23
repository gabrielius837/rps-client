import { Text } from './Text';
import { CopyIcon } from './Svg';
import { Button } from './Button';
import { useToast } from './Toast';

interface Props {
    toCopy?: string;
    fontSize?: string;
    children: string;
}

const CopyToClipboard: React.FC<Props> = ({ toCopy, children, fontSize }) => {
    const { toastInfo, toastError } = useToast();

    const onClick = () => {
        if (!navigator.permissions || !navigator.clipboard || !toCopy)
            return;
        navigator.clipboard.writeText(toCopy)
            .then(() => toastInfo('Clipboard', <Text>Value <Text style={{ wordBreak: 'break-all'}}>'{toCopy}'</Text> was added to clipboard</Text>))
            .catch((error) => {
                console.error(error);
                toastError('Clipboard error', 'Error occured while writing to clipboard');
            })
    }

    const disabled = !!!toCopy;
    return (
        <>
            <Button
                type='button' 
                disabled={!!!toCopy}
                variant='info'
                onClick={onClick}
            >
                {children}
                <CopyIcon color={disabled ? '#666666' : 'white'} width='18px' margin='8px' />
            </Button>
        </>
    );
};

export default CopyToClipboard;
