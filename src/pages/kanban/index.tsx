import styled from "@emotion/styled";
import XLoading from "components/loading";
import { FC } from "react";
import { IKanban } from "tools/kanban";
import { useTasks } from "tools/task";
import XKanbanAdd from "./kanban-add";
import XKanbanColumn from "./kanban-column";
import XSearchTask from "./search-task";
import { useKanbans, useProjectInUrl, useReorderKanban } from "./utils-kanban";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import XDrop from "components/drop";
import XDrag from "components/drag";
import { getTypeTask, useReorderTask } from "./utils-task";

const XKanban:FC = () => {

    const { data: project, isLoading: projectLoading } = useProjectInUrl()
    const { data: tasks, isLoading: taskLoading} = useTasks()
    const loading = projectLoading || taskLoading
    const { data: kanbans } = useKanbans()
    const { mutateAsync: reorderKanban } = useReorderKanban()
    const { mutateAsync: reorderTask } = useReorderTask()
    /**
     * 
     * source: 起点
     * destination: 终点 
     * draggableId: 被拖拽item id
     */
    function onDragEnd(e: DropResult) {
        const { source, destination, draggableId, type } = e
        if(!kanbans || !destination || !tasks) return
        if(type === "column") {
            const from: IKanban = kanbans[source.index]
            const reference: IKanban = kanbans[destination.index]
            reorderKanban({
                fromId: from.id,
                referenceId: reference.id,
                type: source.index < destination.index ? "after" : "before"
            })
        }
        if(type === "task") {
            const filterTasks = tasks.filter(task => task.kanbanId === Number(destination.droppableId))
            const reference = filterTasks[destination.index] || filterTasks[destination.index-1]
            const type = getTypeTask({
                arr: filterTasks,
                fromIndex: source.index,
                fromKanbanId: Number(source.droppableId),
                toIndex: destination.index,
                toKanbanId: Number(destination.droppableId),
            })
            reorderTask({
                fromKanbanId: Number(source.droppableId),
                fromId: Number(draggableId),
                toKanbanId: Number(destination.droppableId),
                referenceId: reference?.id,
                type
            })
        }
    }

    return <Content>
        <h1 className="title">{project?.name}看板</h1>
        <XSearchTask />
        {
            loading 
            ? <XLoading className="loading" /> 
            : <DragDropContext  onDragEnd={onDragEnd} >
                <div className="column-content" >
                    <XDrop 
                        className="kanbans" 
                        droppableId="columns-drop"
                        type="column"
                        direction="horizontal"
                        hoverBg="#fff"
                    >
                        {kanbans?.map((kanban, index) => (
                            <XDrag draggableId={`kanban-${kanban.id}`} index={index} dragAll={false} key={kanban.id} >
                                <XKanbanColumn key={kanban.id} kanban={kanban} />
                            </XDrag>
                        ))}
                    </XDrop>
                    <XKanbanAdd />
                </div>
            </DragDropContext>
        }
    </Content>
}

export default XKanban

const Content = styled.div`
    padding: 2rem;
    .title {
        margin-bottom: 1rem;
    }
    .loading {
        width: 100%;
        height: calc(100vw - 6rem);
    }
    .column-content {
        height: calc(100vh - 20rem);
        display: flex;
        overflow: scroll;
        .kanbans {
            display: flex;
        }
    }
`