import { Button, Input, Row } from "antd";
import Form from "antd/lib/form/Form";
import { XRow } from "components/css-in-js/row";
import XTaskTypeSelect from "components/tasktype-select";
import XUserSelect from "components/user-select";
import React, { FC } from "react";
import useKanbanParam from "../utils";

const XKanbanSearch: FC = () => {

    const {param, setParams, reset} = useKanbanParam()

    return <XRow gap={1} marginBottom={2} >
        <Input 
            placeholder='任务名'
            style={{width: '20rem'}}
            value={param.name}
            onChange={e => setParams({name: e.target.value})}
        />
        <XUserSelect 
            defaultName='经办人' 
            value={param.processorId}
            onChange={value => setParams({processorId: value})}
        />
        <XTaskTypeSelect 
            defaultName='类型' 
            value={param.typeId}
            onChange={value => setParams({typeId: value})}
        />
        <Button onClick={reset} >清除筛选器</Button>
    </XRow>
}

export default XKanbanSearch