import styled from "@emotion/styled";
import { Drawer, Form, Input } from "antd";
import React, { FC, useState } from "react";
import AlertModel from "tools/alert";
import { IProject } from "tools/project";

const XProjectForm:FC  = () => {

    const [visible, setVisible] = useState(false)

    AlertModel.projectForm = async (param?: Partial<IProject>) => {
        setVisible(!visible)
        
    }

    return <Content visible={visible} onClose={() => setVisible(false)} width="100vw" >
        <Form layout="vertical" className="form">
            {
                
            }
            <h2 className="title" >创建项目</h2>
            <Form.Item label="名称" name="name" rules={[{required: true, message: "输入项目名称"}]} >
                <Input placeholder="输入项目名称" />
            </Form.Item>
            <Form.Item label="部门" name="organization" rules={[{required: true, message: "输入部门名称"}]} >
                <Input placeholder="输入部门名称" />
            </Form.Item>
            <Form.Item label="名称" name="name" rules={[{required: true, message: "输入项目名称"}]} >
                <Input placeholder="输入部门名称" />
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
            .title {
            }
        }
    }
`