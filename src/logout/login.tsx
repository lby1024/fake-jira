import React, { FC } from "react";
import { Form, Input } from 'antd';
import { useUser } from 'context/user-cotext';
import { UserForm } from 'models/user';
import FormItem from 'antd/lib/form/FormItem';
import { LongButton } from 'logout';
import useAsync from "utils/use-async";

interface ILoginScreen {
  onError: (err: Error) => void
}

export const LoginScreen:FC<ILoginScreen> = (props) => {

  const { login } = useUser()
  const { run, isLoading } = useAsync()

  const handleSubmit = (params: UserForm) => {
    run(login(params)).catch(err => {
      console.log(err)
      props.onError(err)
    })
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
        <LongButton loading={isLoading} htmlType='submit' type='primary' >登陆</LongButton>
      </FormItem>

    </Form>
  );
};
