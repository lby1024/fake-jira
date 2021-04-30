import { ITask } from "models/task";
import { FC, useMemo } from "react";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";

interface IXTaskIcon {
    info: ITask
}

const XTaskIcon: FC<IXTaskIcon> = ({info}) => {
    const icon = useMemo(() => {
        if(info?.typeId === 1) {
            return taskIcon
        }
        return bugIcon
    }, [info])
    
    return <img src={icon} alt="icon"/>
}

export default XTaskIcon