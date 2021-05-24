import styled from "@emotion/styled";
import XLoading from "components/loading";
import { FC, useEffect } from "react";
import { IKanban } from "tools/kanban";
import { useTasks } from "tools/task";
import XKanbanAdd from "./kanban-add";
import XKanbanColumn from "./kanban-column";
import XSearchTask from "./search-task";
import { useKanbans, useProjectInUrl } from "./utils-kanban";

const XKanban:FC = () => {

    const { data: project, isLoading: projectLoading } = useProjectInUrl()
    const {isLoading: taskLoading} = useTasks()
    const loading = projectLoading || taskLoading
    const { data: kanbans } = useKanbans()
    
    return <Content>
        <h1 className="title">{project?.name}看板</h1>
        <XSearchTask />
        {
            loading ? <XLoading className="loading" /> : <div className="column-content">
                {kanbans?.map(kanban => <XKanbanColumn key={kanban.id} kanban={kanban} />)}
                <XKanbanAdd />
            </div>
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
    }
`