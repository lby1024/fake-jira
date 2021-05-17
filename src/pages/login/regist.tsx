import styled from "@emotion/styled";
import { Input, Form, Button } from "antd";
import { useTitle } from "hooks/use-title";
import React, { FC } from "react";
import { useRegist } from "tools/user";

interface IRegistForm {
    username: string;
    password: string;
    cpassword: string;
}

interface IXRegist {
    onError: (err: Error) => void
}

const XRegist:FC<IXRegist> = ({onError}) => {

    useTitle("注册")
    const {mutateAsync: regist, isLoading} = useRegist()

    const onFinish = ({cpassword, ...data}: IRegistForm) => {
        if(data.password !== cpassword) {
            const err = new Error('请确保两次密码相同')
            onError(err)
            return
        }
        regist(data).catch(error => onError(error))
    }

    return <Content>
        <Form onFinish={onFinish} >
            <Form.Item name="username" rules={[{required: true, message: '请输入用户名'}]} >
                <Input placeholder="用户名" />
            </Form.Item>

            <Form.Item name="password" rules={[{required: true, message: '请输入密码'}]} >
                <Input.Password placeholder="密码" />
            </Form.Item>

            <Form.Item name='cpassword' rules={[{required: true, message: '请再次输入密码'}]} >
                <Input.Password placeholder='确认密码' type='text' />
            </Form.Item>

            <Form.Item>
                <Button className="btn" type="primary" htmlType="submit" loading={isLoading} >注册</Button>
            </Form.Item>
        </Form>
    </Content>
}

export default XRegist

const Content = styled.div`
    .btn {
        width: 100%;
    }
`