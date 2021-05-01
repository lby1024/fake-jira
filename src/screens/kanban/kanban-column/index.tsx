import styled from "@emotion/styled"
import { Row } from "antd"
import { IKanban } from "models/kanban"
import { useTasks } from "models/task"
import React, { FC } from "react"
import XTaskCard from "../task-card"
import useTasksParam from "../utils"

interface IXKanbancolumn {
    info: IKanban
    className?: string
}

const XKanbancolumn: FC<IXKanbancolumn> = ({info, className}) => {
    const {param} = useTasksParam()
    const allTasks = useTasks(param)
    const tasks = allTasks.data?.filter(item => item.kanbanId === info.id)

    return <CSS className={className} >
        <Row>
            <h3>{info.name}</h3>
        </Row>
        {
            tasks?.map(task => <XTaskCard 
                info={task} 
                className='task-card' 
                key={task.id}
            />)
        }
    </CSS>
}

export default XKanbancolumn

export const CSS = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    overflow: scroll;
    .task-card {
        margin-bottom: .5rem;
    }
`