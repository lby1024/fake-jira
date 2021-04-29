import styled from "@emotion/styled"
import { Row } from "antd"
import { IKanban } from "models/kanban"
import React, { FC } from "react"

interface IXKanbancolumn {
    info: IKanban
    className?: string
}

const XKanbancolumn: FC<IXKanbancolumn> = ({info, className}) => {
    console.log(info, '--- 11')
    return <CSS className={className} >
        <Row>
            <h3>{info.name}</h3>
        </Row>
        <div className="container">

        </div>
    </CSS>
}

export default XKanbancolumn

const CSS = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);
    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
`