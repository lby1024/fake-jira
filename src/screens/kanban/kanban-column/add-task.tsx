import { Card, Input } from "antd";
import { useAddTask } from "models/task";
import { FC, useState } from "react";
import { useProjectIdInUrl } from "../utils";

interface IXAddTask {
    kanbanId: number
}

const XAddTask: FC<IXAddTask> = ({kanbanId}) => {
    const [name, setName] = useState("")
    const projectId = useProjectIdInUrl()
    const [inputShow, setInputShow] = useState(false)
    const { mutate: addTask } = useAddTask()

    const add = async () => {
        await addTask({name, kanbanId, projectId})
        setInputShow(false)
        setName("")
    }

    if(inputShow) {
        return <Card>
            <Input 
                placeholder='需要做些什么' 
                autoFocus={true}
                value={name}
                onPressEnter={add}
                onChange={e => setName(e.target.value)}
                onBlur={() => setInputShow(!inputShow)}
            />
        </Card>
    }
    return <div 
        className="add-task" 
        onClick={() => setInputShow(true)} >
        创建任务+
    </div>
}

export default XAddTask