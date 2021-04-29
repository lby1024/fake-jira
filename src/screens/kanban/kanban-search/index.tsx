import { Button, Input, Row } from "antd";
import Form from "antd/lib/form/Form";
import { XRow } from "components/css-in-js/row";
import XTaskTypeSelect from "components/tasktype-select";
import XUserSelect from "components/user-select";
import React, { FC } from "react";

const XKanbanSearch: FC = () => {
    return <XRow gap={1} marginBottom={2} >
        <Input 
            placeholder='任务名'
            style={{width: '20rem'}}
        />
        <XUserSelect defaultName='经办人' />
        <XTaskTypeSelect defaultName='类型' />
        <Button >清除筛选器</Button>
    </XRow>
}

export default XKanbanSearch