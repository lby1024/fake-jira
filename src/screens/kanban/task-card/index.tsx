import { Card } from "antd";
import AlertModel from "models/alert";
import { ITask } from "models/task";
import { FC } from "react";
import XTaskIcon from "./task-icon";

interface IXTaskCard {
    info: ITask
    className?: string
}

const XTaskCard: FC<IXTaskCard> = ({info, className}) => {
    const editor = () => {
        AlertModel.taskForm({taskId: info.id})
    }
    
    return <Card className={className} onClick={editor} >
        <p>{info.name}</p>
        <XTaskIcon info={info} />
    </Card>
}

export default XTaskCard