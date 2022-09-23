import { useEffect, useState } from "react"
import { PaperIcon, RockIcon, ScissorsIcon } from "../../../components/Svg"

const resolveMoveValue = (value: number) => {
    switch (value) {
        case 1:
            return <RockIcon />
        case 2:
            return <PaperIcon />
        case 3:
            return <ScissorsIcon />
        default:
            return null;
    }
}

interface Props {
    value: number;
}

const MoveIcon = ({ value }: Props) => {
    const [moveValue, setMoveValue] = useState(value);

    useEffect(() => {
        setMoveValue(value);
    }, [value]);

    return resolveMoveValue(moveValue);
}

export default MoveIcon;