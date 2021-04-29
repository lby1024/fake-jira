import { Card } from "antd";
import { IKanban } from "models/kanban";
import { FC } from "react";

interface IXTaskCard {
    info: IKanban
    className?: string
}

const XTaskCard: FC<IXTaskCard> = ({info, className}) => {
    return <Card className={className} >
        <p>{info.name}</p>
    </Card>
}

export default XTaskCard