import React, { FormEvent } from "react";
import { Form, Input } from 'antd';
import { useUser } from 'context/user-cotext';
import { UserForm } from 'models/user';
import FormItem from 'antd/lib/form/FormItem';
import { LongButton } from 'unauthenticated-app';

export const LoginScreen = () => {

  const { login, user } = useUser()

  const handleSubmit = (params: UserForm) => {
    login(params)
  };

  return (
    <Form onFinish={handleSubmit} >

      <FormItem name='username' rules={[{required: true, message: '请输入用户名'}]} >
        <Input placeholder='用户名' type='text' />
      </FormItem>

      <FormItem name='password' rules={[{required: true, message: '请输入密码'}]} >
        <Input placeholder='密码' type='text' />
      </FormItem>

      <FormItem>
        <LongButton htmlType='submit' type='primary' >登陆</LongButton>
      </FormItem>

    </Form>
  );
};
