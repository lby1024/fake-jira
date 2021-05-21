import styled from "@emotion/styled";
import XLoading from "components/loading";
import { FC } from "react";
import XKanbanAdd from "./kanban-add";
import XKanbanColumn from "./kanban-column";
import { useKanbans, useProjectInUrl } from "./utils";

const XKanban:FC = () => {

    const { data: project, isLoading } = useProjectInUrl()
    const { data: kanbans } = useKanbans()

    return <Content>
        {
            isLoading ? <XLoading className="loading" /> : <>
                <h2>{project?.name}看板</h2>
                <div className="column-content">
                    {
                        kanbans?.map(kanban => <XKanbanColumn key={kanban.id} kanban={kanban} />)
                    }
                    <XKanbanAdd />
                </div>
            </>
        }
    </Content>
}

export default XKanban

const Content = styled.div`
    padding: 2rem;
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