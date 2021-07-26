import styled from "@emotion/styled";
import { Button, Drawer, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useProjectIdInUrl } from "pages/kanban/utils";
import React, { FC, useState } from "react";
import AlertModel from "tools/alert";
import { IProject } from "tools/project";
import { useAddEpic } from "./utils";

const XEpicForm:FC  = () => {

    const [ form ] = useForm()
    const [ visible, setVisible ] = useState(false)
    const { mutateAsync: addEpic, isLoading } = useAddEpic()
    const projectId = useProjectIdInUrl()

    AlertModel.epicForm = async (param?: Partial<IProject>) => {
        setVisible(!visible)
    }

    function onFinish(data: any) {
        addEpic({...data, projectId}).then(() => close())
    }

    function close() {
        setVisible(false)
        form.resetFields()
    }

    return <Content visible={visible} onClose={close} width="100vw" >
        <Form layout="vertical" className="form" onFinish={onFinish} form={form} >
            <h2 className="title" >创建任务</h2>

            <Form.Item label="名称" name="name" rules={[{required: true, message: "输入项目名称"}]} >
                <Input placeholder="输入项目名称" />
            </Form.Item>

            <Form.Item className="submit" >
                <Button type="primary" htmlType="submit" loading={isLoading} >提交</Button>
            </Form.Item>
        </Form>
    </Content>
}

export default XEpicForm

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