import styled from "@emotion/styled";
import { XRow } from "components/row";
import { FC } from "react";
import { IKanban } from "tools/kanban";
import XKanbanMore from "./kanban-more";

interface IXKanbanColumn {
    kanban: IKanban
}

const XKanbanColumn:FC<IXKanbanColumn> = ({kanban}) => {

    return <Content>
        <XRow between={true} >
            <h3>{kanban.name}</h3>
            <XKanbanMore />
        </XRow>
    </Content>
}

export default XKanbanColumn

export const Content = styled.div`
    background-color: #f7f7f7;
    min-width: 27rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    overflow: scroll;
    margin-right: 1rem;
    .task-card {
        margin-bottom: .5rem;
    }
`