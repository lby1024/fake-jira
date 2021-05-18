import styled from "@emotion/styled";
import { Button, Drawer, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import XUserSelect from "components/select/user-select";
import React, { FC, useState } from "react";
import AlertModel from "tools/alert";
import { IProject, useAddProject } from "tools/project";

const XProjectForm:FC  = () => {

    const [ visible, setVisible ] = useState(false)
    const { mutateAsync: addProject } = useAddProject()
    const [ type, setType ] = useState<"add"|"edit">("add")
    const [ form ] = useForm()

    AlertModel.projectForm = async (param?: Partial<IProject>) => {
        setVisible(!visible)
        
    }

    function onFinish(data: any) {
        console.log(data)
        if(type === "add") add(data)

    }

    function add(data: any) {
        addProject(data)
        close()
    }

    function close() {
        setVisible(false)
        form.resetFields()
    }

    return <Content visible={visible} onClose={close} width="100vw" >
        <Form layout="vertical" className="form" onFinish={onFinish} form={form} >
            {

            }
            <h2 className="title" >创建项目</h2>

            <Form.Item label="名称" name="name" rules={[{required: true, message: "输入项目名称"}]} >
                <Input placeholder="输入项目名称" />
            </Form.Item>

            <Form.Item label="部门" name="organization" rules={[{required: true, message: "输入部门名称"}]} >
                <Input placeholder="输入部门名称" />
            </Form.Item>

            <Form.Item label="负责人" name="personId" >
                <XUserSelect />
            </Form.Item>

            <Form.Item className="submit" >
                <Button type="primary" htmlType="submit" >提交</Button>
            </Form.Item>
        </Form>
    </Content>
}

export default XProjectForm

const Content = styled(Drawer)`
    .ant-drawer-body {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 32px;
        padding-top: 200px;
        .form {
            width: 50vw;
            text-align: center;
            .submit {
                text-align: right;
            }
        }
    }
`