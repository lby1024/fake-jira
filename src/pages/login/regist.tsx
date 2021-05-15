import styled from "@emotion/styled";
import { Input, Form, Button, Divider } from "antd";
import React, { FC } from "react";

const XRegist:FC = () => {
    return <Content >
        <h2 className="title" >注册</h2>

        <Form.Item name="username" >
            <Input placeholder="用户名" />
        </Form.Item>

        <Form.Item name="password" >
            <Input.Password placeholder="密码" />
        </Form.Item>

        <Form.Item>
            <Button className="btn" type="primary" htmlType="submit" >登录</Button>
        </Form.Item>
    </Content>
}

export default XRegist

const Content = styled(Form)`
    .title {
        margin-bottom: 2.4rem;
        color: rgb(94, 108, 132);
    }
    .btn {
        width: 100%;
    }
`