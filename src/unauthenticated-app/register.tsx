import React, { FC } from "react";
import { Form, Input } from 'antd';
import { useUser } from 'context/user-cotext';
import { UserForm } from 'models/user';
import FormItem from 'antd/lib/form/FormItem';
import { LongButton } from 'unauthenticated-app';

interface IRegisterScreen {
    onError: (err: Error) => void
}

interface IForm {
  username: string;
  password: string;
  cpassword: string;
}

export const RegisterScreen: FC<IRegisterScreen> = (props) => {

  const { register } = useUser()

  const handleSubmit = ({ cpassword, ...params }: IForm) => {
    if(cpassword !== params.password) {
      const error = new Error('请确保两次密码相同')
      props.onError(error)
      return
    }
    register(params).catch(err => props.onError(err))
  };

  return (
    <Form onFinish={handleSubmit} >

      <FormItem name='username' rules={[{required: true, message: '请输入用户名'}]} >
        <Input placeholder='用户名' type='text' />
      </FormItem>

      <FormItem name='password' rules={[{required: true, message: '请输入密码'}]} >
        <Input.Password placeholder='密码' type='text' />
      </FormItem>

      <FormItem name='cpassword' rules={[{required: true, message: '请再次输入密码'}]} >
        <Input.Password placeholder='确认密码' type='text' />
      </FormItem>

      <FormItem>
        <LongButton htmlType='submit' type='primary' >注册</LongButton>
      </FormItem>

    </Form>
  );
};
