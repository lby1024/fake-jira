import { Content } from "./kanban-column";
import { FC, useState } from "react";
import { Input } from "antd";
import { useAddKanban, useProjectIdInUrl } from "./utils";

interface IXKanbanAdd {

}

const XKanbanAdd:FC<IXKanbanAdd> = () => {

    const [name, setName] = useState("")
    const projectId = useProjectIdInUrl()
    const { mutateAsync: addKanban } = useAddKanban()
    async function submit() {
        await addKanban({name, projectId})
        setName("")
    }

    return <Content>
        <Input 
            size="large" 
            placeholder="新建看板名称" 
            value={name}
            onChange={e => setName(e.target.value)}
            onPressEnter={submit}
        />
    </Content>
}

export default XKanbanAdd