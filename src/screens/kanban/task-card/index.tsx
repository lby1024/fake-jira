import { Card } from "antd";
import { ITask } from "models/task";
import { FC } from "react";
import XTaskIcon from "./task-icon";

interface IXTaskCard {
    info: ITask
    className?: string
}

const XTaskCard: FC<IXTaskCard> = ({info, className}) => {
    
    return <Card className={className} >
        <p>{info.name}</p>
        <XTaskIcon info={info} />
    </Card>
}

export default XTaskCard