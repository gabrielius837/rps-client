import { isBytes, isHexString } from "@ethersproject/bytes";
import { BigNumber, BigNumberish } from "ethers";

const isBigNumberish = (value: any): value is BigNumberish => {
    return (value != null) && (
        BigNumber.isBigNumber(value) ||
        (typeof(value) === 'number' && (value % 1) === 0) ||
        (typeof(value) === 'string' && !!value.match(/^[0-9]+$/)) ||
        isHexString(value) ||
        (typeof(value) === 'bigint') ||
        isBytes(value)
    );
}

export default isBigNumberish;