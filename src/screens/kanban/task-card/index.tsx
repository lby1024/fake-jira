import { Card } from "antd";
import AlertModel from "models/alert";
import { ITask } from "models/task";
import { FC } from "react";
import useUrlParams from "utils/use-url-params";
import XTaskIcon from "./task-icon";
import XTaskTitle from "./task-title";

interface IXTaskCard {
    info: ITask
    className?: string
}

const XTaskCard: FC<IXTaskCard> = ({info, className}) => {

    const [param, setParams] = useUrlParams(['name'])
    const editor = () => {
        AlertModel.taskForm({taskId: info.id})
    }
    
    return <Card className={className} onClick={editor} >
        <XTaskTitle txt={info.name} keyword ={param.name} />
        <XTaskIcon info={info} />
    </Card>
}

export default XTaskCard