import { constants } from 'ethers';
import { RockPaperScissors } from '../../typechain-types';
import { Text } from '../Text';

export const noContext = <Text fontSize='20px'>Context was not provided</Text>

export const reward = (wrapper: RockPaperScissors.GameWrapperStructOutput) => {
    return wrapper.game.pot
        .sub(wrapper.game.pot.mul(wrapper.context.ownerTipRate).div(10000))
        .sub(wrapper.game.referral === constants.AddressZero ? 0 : wrapper.game.pot.mul(wrapper.context.referralTipRate).div(10000));
}