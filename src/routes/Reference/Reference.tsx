import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import { Box, Flex } from "../../components/Box";
import { Button } from "../../components/Button";
import { Text } from '../../components/Text';
import CopyToClipboard from "../../components/CopyToClipboard";
import { useToast } from "../../components/Toast";
import { useRockPaperScissorsContract } from "../../hooks";
import retryPromise from "../../utils/retryPromise";
import StyledBackground from "../StyledBackground";
import { NotConnectedCard } from "../Game/components/Card";
import useStore from "../../state";

const margin = '8px auto';
const marginText = '8px';

const Referral = () => {
    const { account, error } = useWeb3React();
    const contract = useRockPaperScissorsContract(true);
    const setTransactionPending = useStore(x => x.setTransactionPending);
    const transactionPending = useStore(x => x.transactionPending);
    const { toastError, toastSuccess, toastWarning } = useToast();
    const [isReferral, setIsReferral] = useState(false);
    const [referralRate, setReferralRate] = useState(NaN);

    useEffect(() => {
        if (!contract)
            return;
        retryPromise(contract.getCurrentContext(), 2)
            .then(context => setReferralRate(context.referralTipRate))
            .catch(error => {
                console.error(error);
                toastError('Fetch error', 'Could not retrieve context data');
            });
    }, [])

    useEffect(() => {
        if (!account || !contract)
            return;

        retryPromise(contract.referrals(account), 2)
            .then(flag => setIsReferral(flag))
            .catch(error => {
                console.error(error);
                toastError('Error', 'Could not retrieve referral data');
            });

    }, [account]);

    const register = async () => {
        if (isReferral) {
            toastWarning('Warning', 'You\'re already a referral');
            return;
        }

        if (!contract)
            return;
        try {
            setTransactionPending(true);
            const tx = await contract.registerReferral();
            await tx.wait(0);
            toastSuccess('Success', 'You\'re now a referral');
            setIsReferral(true);
        } catch (error: any) {
            if (error.code === 4001)
                return;
            console.error(error);
            toastError('Error', 'Could not register as a referral');
        } finally {
            setTransactionPending(false);
        }
    }
    const refLink = `${window.origin}/newgame?ref=${account}`;
    const refTipRate = (referralRate / 100).toFixed(2);

    if (!account || error)
        return <NotConnectedCard />

    return (
        <Flex alignItems='center' justifyContent='center' height='100%'>
            <Box margin='4px'>
                <StyledBackground>
                    <Flex justifyContent='center' flexDirection='column' padding='8px' borderRadius='8px' maxWidth='480px' margin='auto'>
                        <Text margin={marginText} fontSize='18px' textAlign='left'>We created a referral program to reward people for helping grow this project.</Text>
                        <Text margin={marginText} fontSize='18px' textAlign='left'>Anyone can register as a referral and share a link.</Text>
                        <Text margin={marginText} fontSize='18px' textAlign='left'>The referral will receive a share of the pot whenever someone creates and plays out a game using the link.</Text>
                        <Text margin={marginText} fontSize='18px' textAlign='left'>Current referral tip: {refTipRate}%</Text>
                        <Flex margin={margin} justifyContent='center'>
                            {
                                isReferral ?
                                    <CopyToClipboard toCopy={refLink}>Copy referral link</CopyToClipboard> :
                                    <Button variant='success' onClick={register} disabled={transactionPending}>Register</Button>
                            }
                        </Flex>
                    </Flex>
                </StyledBackground>
            </Box>
        </Flex>
    )
}

export default Referral;