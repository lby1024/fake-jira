import { Input } from "antd";
import { useAddKanban } from "models/kanban";
import { FC, useState } from "react";
import { CSS } from ".";
import { useProjectIdInUrl } from "../utils";

const XAddKanban: FC = () => {
    const [name, setName] = useState('')
    const {mutate: addKanban} = useAddKanban()
    const projectId = useProjectIdInUrl();
    const submit = async () => {
        await addKanban({name, projectId})
        setName('')
    }

    return <CSS>
        <Input
            size='large'
            placeholder='新建看板名称'
            value={name}
            onChange={e => setName(e.target.value)}
            onPressEnter={submit}
        />
    </CSS>
}

export default XAddKanban