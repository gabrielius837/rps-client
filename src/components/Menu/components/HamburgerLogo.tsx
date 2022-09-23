import React from 'react';
import { Flex } from '../../../components/Box';
import { HamburgerIcon } from '../../Svg';
import MenuButton from './MenuButton';

interface Props {
    isPushed: boolean;
    togglePush: () => void;
}

const Logo: React.FC<Props> = ({ isPushed, togglePush }) => {
    const width = '36px';
    return (
        <Flex>
            <MenuButton aria-label='Toggle menu' onClick={togglePush} mr={width}>
                <HamburgerIcon width={width} active={isPushed} />
            </MenuButton>
        </Flex>
    );
};

export default Logo;
