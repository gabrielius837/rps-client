import { ChangeEvent, CSSProperties } from 'react';
import styled from 'styled-components';

import { PaperIcon, RockIcon, ScissorsIcon } from '../../../components/Svg';
import { Grid } from '../../../components/Box'

const SvgContainer = styled.div<{ disabled: boolean }>`
    border-radius: 8px;
    transition: all 250ms linear;
`;

const CardContainer = styled.div`
    position: relative;
    input[type='radio']:checked + ${SvgContainer} {
        box-shadow: ${({ theme }) => theme.shadows.active};
        background-color: rgba(31, 199, 212, 0.4);
    }

    input[type='radio']:disabled + ${SvgContainer} {
        box-shadow: none;
        opacity: 0.5;
    }
`;

const style: CSSProperties = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer'
}

interface Props {
    callback: (event: ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean;
}

const MoveRadio = ({ callback, disabled = false }: Props) => {
    return (
        <Grid gridTemplateColumns='repeat(3, 1fr)'>
            <CardContainer>
                <input type='radio' name='move-radio' value='1' disabled={disabled} style={style} onChange={callback} />
                <SvgContainer disabled={disabled}>
                    <RockIcon width='100%' height='100%' />
                </SvgContainer>
            </CardContainer>
            <CardContainer>
                <input type='radio' name='move-radio' value='2' disabled={disabled} style={style} onChange={callback} />
                <SvgContainer disabled={disabled}>
                    <PaperIcon width='100%' height='100%' />
                </SvgContainer>
            </CardContainer>
            <CardContainer>
                <input type='radio' name='move-radio' value='3' disabled={disabled} style={style} onChange={callback} />
                <SvgContainer disabled={disabled}>
                    <ScissorsIcon width='100%' height='100%' />
                </SvgContainer>
            </CardContainer>
        </Grid>
    );
}

export default MoveRadio;