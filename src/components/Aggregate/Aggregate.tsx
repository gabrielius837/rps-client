import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Aggregate = ({ children }: Props) => {
    return <>
        {children}
    </>
}

export default Aggregate;