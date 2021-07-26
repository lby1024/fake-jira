import styled from "@emotion/styled";
import { XRow } from "components/row";
import { FC } from "react";
import { IKanban } from "tools/kanban";
import { useTasks } from "tools/task";
import XKanbanMore from "./kanban-more";
import XAddTask from "./task-add";
import XTaskCard from "./task-card";
import { DraggableProvided } from "react-beautiful-dnd";
import XDrop from "components/drop";
import XDrag from "components/drag";

interface IXKanbanColumn {
    kanban: IKanban
    provided?: DraggableProvided;
}

const XKanbanColumn:FC<IXKanbanColumn> = ({kanban, provided}) => {

    const { data: tasks } = useTasks()
    const filterTasks = tasks?.filter(task => task.kanbanId === kanban.id)

    return <Content>
        <XRow between={true} {...provided?.dragHandleProps} >
            <h3>{kanban.name}</h3>
            <XKanbanMore kanban={kanban} />
        </XRow>
        <div className="drop-content" >
            <XDrop droppableId={String(kanban.id)} type="task" direction="vertical" className='task-drop' bg="#f7f7f7" >
                {
                    filterTasks?.map((task, index) => <XDrag draggableId={String(task.id)} index={index} key={task.id} >
                        <XTaskCard task={task} />
                    </XDrag>)
                }
            </XDrop>
            {/* {
                filterTasks?.map((task, index) => <XTaskCard task={task} key={index} />)
            } */}
            <XAddTask kanban={kanban} />
        </div>
    </Content>
}

export default XKanbanColumn

export const Content = styled.div`
    background-color: #f7f7f7;
    min-width: 27rem;
    height: 100%;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 0.7rem;
    overflow: auto;
    margin-right: 1rem;
    .drop-content {
        .task-drop {
            min-height: 1rem;
            .task-card {
                margin-bottom: .5rem;
            }
        }
    }
`