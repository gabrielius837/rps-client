import styled from 'styled-components';

import { Flex } from "../Box"
import { HelpIcon } from "../Svg"
import { Text } from "../Text"
import { useTooltip } from ".";

interface Props {
    children: React.ReactNode;
    tooltipText: string;
}

const PointerSpan = styled.span`
    cursor: pointer;
`

const TooltipLabel: React.FC<Props> = ({ children, tooltipText }) => {
    const {
        tooltipVisible,
        targetRef,
        tooltip
    } = useTooltip(tooltipText, { placement: "top", trigger: "hover" });

    return (
        <Flex flexDirection='row'>
            <Text fontSize='20px' margin='4px'>{children}</Text>
            <PointerSpan ref={targetRef}><HelpIcon color='#a5678e' width='32px' /></PointerSpan>
            {tooltipVisible && tooltip}
        </Flex>
    )
}

export default TooltipLabel;