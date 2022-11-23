import styled from "@emotion/styled";
import { Form, Input } from "antd";
import XUserSelect from "components/select/user-select";
import React, { FC } from "react";
import { useProjectsParam } from "tools/project";

const XSearch:FC = () => {

    const { params, setParams } = useProjectsParam()

    const onName = (name: string) => {
        setParams({
            ...params,
            name
        })        
    }

    function onPersonId(personId: any) {
        setParams({
            ...params,
            personId: personId || undefined
        })
    }

    return <Content layout="inline" >
        <Form.Item>
            <Input type="text" placeholder="项目名" value={params.name} onChange={e => onName(e.target.value)} />
        </Form.Item>

        <Form.Item>
            <XUserSelect value={params.personId} onChange={onPersonId} />
        </Form.Item>
    </Content>
}

export default XSearch

const  Content = styled(Form)`
    margin-bottom: 2rem
`