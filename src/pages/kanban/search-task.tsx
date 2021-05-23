import styled from "@emotion/styled";
import { Button, Input } from "antd";
import { XRow } from "components/row";
import XTaskTypeSelect from "components/select/task-type-select";
import XUserSelect from "components/select/user-select";
import { FC } from "react";
import { useTasksParam } from "./utils-task";

interface IXSearchTask {

}

const XSearchTask:FC<IXSearchTask> = () => {

    const { params, setParams, reset } = useTasksParam()
    return <Content gap={1} marginBottom={2} >
        <Input 
            className="input" 
            value={params.name}
            onChange={e => setParams({name: e.target.value})}
        />
        <XUserSelect 
            value={params.processorId}
            onChange={v => setParams({processorId: v})}
        />
        <XTaskTypeSelect 
            value={params.typeId}
            onChange={v => setParams({typeId: v})}
        />
        <Button onClick={reset}>清除筛选器</Button>
    </Content>
}

export default XSearchTask

const Content = styled(XRow)`
    .input {
        width: 20rem;
    }
`