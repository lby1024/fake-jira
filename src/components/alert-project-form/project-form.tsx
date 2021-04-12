import styled from "@emotion/styled"
import { Form, Input } from "antd"
import XUserSelect from "components/id-select"
import React, { FC } from "react"


const XProjectForm: FC = () => {

    return <CSS>
        <Form style={{width: '40vw'}} className='form' >
            <Form.Item 
                name='name' 
                label='名称' 
                rules={[{required: true, message: '输入项目名称'}]} >
                <Input placeholder='输入项目名称' />
            </Form.Item>

            <Form.Item 
                name='organization' 
                label='部门' 
                rules={[{required: true, message: '输入部门名称'}]} >
                <Input placeholder='输入部门名称' />
            </Form.Item>

            <Form.Item 
                name="personId"
                label='负责人'>
                <XUserSelect defaultName='负责人' />
            </Form.Item>
        </Form>
    </CSS>
}

export default XProjectForm

const CSS = styled.div`
    .form {
        margin: 10vh auto;
    }
`
