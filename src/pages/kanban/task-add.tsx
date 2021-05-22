import styled from "@emotion/styled";
import { Card, Input } from "antd";
import { FC, useState } from "react";
import { IKanban } from "tools/kanban";
import { useAddTask } from "tools/task";
import { useProjectIdInUrl } from "./utils";

interface IXAddTask {
    kanban: IKanban
}

const XAddTask:FC<IXAddTask> = ({kanban}) => {

    const [inputShow, setInputShow] = useState(false)
    const [name, setName] = useState("")
    const projectId = useProjectIdInUrl()
    const { mutateAsync: addTask } = useAddTask()

    function add() {
        addTask({
            name, 
            projectId,
            kanbanId: kanban.id
        })
        setName("")
    }

    return <Content>
        {
            !inputShow 
            ? <div className="add" onClick={() => setInputShow(true)} >+添加task</div> 
            : <Card>
                <Input 
                    placeholder="需要做点什么" 
                    autoFocus={true}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setInputShow(false)}
                    onPressEnter={add}
                />
            </Card>
        }
    </Content>
}

export default XAddTask

const Content = styled.div`
    .add {
        padding-left: 1rem;
    }
`