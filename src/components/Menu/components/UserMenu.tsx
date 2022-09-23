import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useStore from "../../../state";
import ConnectWalletButton from "./ConnectWalletButton";
import { Variant as UserMenuVariant } from './types';
import UserState from "./UserState";

const UserMenu = () => {
    const { account, error } = useWeb3React();
    const transactionPending = useStore(x => x.transactionPending);
    const [userMenuText, setUserMenuText] = useState<string>('');
    const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default');
    const isWrongNetwork: boolean = !!error && error instanceof UnsupportedChainIdError;

    useEffect(() => {
        if (transactionPending) {
            setUserMenuText('Pending');
            setUserMenuVariable('pending');
        } else {
            setUserMenuText('');
            setUserMenuVariable('default');
        }
    }, [transactionPending])

    if (account) {
        return (
            <UserState account={account} text={userMenuText} variant={userMenuVariable}/>
        )
    }

    if (isWrongNetwork) {
        return (
            <UserState text='Network' variant="danger"/>
        )
    }

    return (
        <ConnectWalletButton scale='sm' />
    )
}

export default UserMenu;