import styled from "@emotion/styled";
import { Input, Form, Button, Divider } from "antd";
import { useTitle } from "hooks/use-title";
import React, { FC } from "react";
import { useLogin } from "tools/user";

interface IXLogin {
    onError: (err: Error) => void
}

interface ILoginForm {
    username: string;
    password: string;
}

const XLogin:FC<IXLogin> = ({onError}) => {

    useTitle("登录")
    const {mutateAsync: login, isLoading} = useLogin()

    const onFinish = (data: ILoginForm) => {
        login(data).catch(err => onError(err))
    }

    return <Content>
        <Form onFinish={onFinish} >
            <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]} >
                <Input placeholder="用户名" />
            </Form.Item>

            <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]} >
                <Input.Password placeholder="密码" />
            </Form.Item>

            <Form.Item>
                <Button className="btn" type="primary" htmlType="submit" loading={isLoading} >登录</Button>
            </Form.Item>
        </Form>
    </Content>
}

export default XLogin

const Content = styled.div`
    .btn {
        width: 100%;
    }
`