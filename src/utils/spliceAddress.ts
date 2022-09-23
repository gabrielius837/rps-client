const spliceAddress = (account: string | undefined) =>
    account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

export default spliceAddress;