import styled from "@emotion/styled"
import { Button, Form, Input } from "antd"
import XUserSelect from "components/user-select"
import React, { FC } from "react"

interface IXProjectForm extends React.ComponentProps<typeof Form> {
    loading: boolean
}

const XProjectForm: FC<IXProjectForm> = ({form, loading, onFinish}) => {

    return <CSS>
        <Form style={{width: '40vw'}} className='form' form={form} onFinish={onFinish} >
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

            <Form.Item style={{textAlign: 'right'}}>
                <Button type='primary' htmlType='submit' loading={loading} >提交</Button>
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
