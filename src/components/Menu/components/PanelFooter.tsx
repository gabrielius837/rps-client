import React from 'react';
import styled from 'styled-components';
import { CogIcon } from '../../../components/Svg';
import { IconButton } from '../../../components/Button';
import { MENU_ENTRY_HEIGHT } from '../config';
import { PanelProps, PushedProps } from '../types';
import SocialLinks from './SocialLinks';

interface Props extends PanelProps, PushedProps { }

const Container = styled.div`
    flex: none;
    padding: 8px 4px;
    background-color: ${({ theme }) => theme.colors.background};
    border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const SocialEntry = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${MENU_ENTRY_HEIGHT}px;
    padding: 0 16px;
`;

const PanelFooter: React.FC<Props> = ({
    isPushed,
    pushNav,
}) => {
    if (!isPushed) {
        return (
            <Container>
                <IconButton variant='text' onClick={() => pushNav(true)}>
                    <CogIcon />
                </IconButton>
            </Container>
        );
    }

    return (
        <Container>
            <SocialEntry>
            </SocialEntry>
        </Container>
    );
};

export default PanelFooter;
