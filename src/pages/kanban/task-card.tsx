import styled from "@emotion/styled";
import { FC, useMemo } from "react";
import { ITask } from "tools/task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Card } from "antd";
import AlertModel from "tools/alert";
import XHightLight from "components/hight-light";
import { useTasksParam } from "./utils-task";

interface IXTaskCard {
    task: ITask
}

const XTaskCard:FC<IXTaskCard> = ({ task }) => {

    const {params} = useTasksParam()

    const icon = useMemo(() => {
        if(task?.typeId === 2) return bugIcon
        return taskIcon
    }, [task])

    return <Content onClick={() => AlertModel.taskForm(task)} >
        <h3>
            <XHightLight txt={task.name} keyword={params.name} />
            ---id: {task.id}
        </h3>
        <img src={icon} alt="icon" />
    </Content>
}

export default XTaskCard

const Content = styled(Card)`
    margin-bottom: 1rem;
`