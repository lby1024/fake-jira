import styled from '@emotion/styled';
import { useKanbans } from 'models/kanban';
import { useProject } from "models/project";
import React, { FC } from "react";
import { useTitle } from "utils";
import XKanbancolumn from './kanban-column';
import XAddKanban from './kanban-column/add-kanban';
import XKanbanSearch from './kanban-search';
import { useProjectInUrl } from "./utils";

const PKanban: FC = () => {
    useTitle("看板列表");
    const project = useProjectInUrl()
    const kanbans = useKanbans()
    
    return <CSS>
        <h1>{project.data?.name}看板</h1>

        <XKanbanSearch />

        <div className="container">
            {
                kanbans.data?.map(item => <XKanbancolumn 
                    info={item} 
                    key={item.id} 
                    className='column'
                />)
            }
            <XAddKanban />
        </div>
    </CSS>
}

export default PKanban


const CSS = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    .container {
        display: flex;
        flex: 1;
        overflow: scroll;
        .column {
            margin-right: 1.5rem;
        }
    }
`