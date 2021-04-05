import React, { ChangeEvent, FC } from 'react'
import { IUserInfo } from 'models/user';
import { Form, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

interface SearchPanelProps {
    users: IUserInfo[]
    param: {
        name: string,
        personId: number | undefined,
    }
    setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel:FC<SearchPanelProps> = ({users, param, setParam}) => {

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setParam({
            ...param,
            name: e.target.value
        })
    }
    const onChangeId = (value: string) => {
        setParam({
            ...param,
            personId: Number(value)
        })
    }

    return (
        <Form layout='inline' style={{marginBottom: "2rem"}} >

            <FormItem>
                <Input 
                    type="text" 
                    placeholder='项目名'
                    value={param.name} 
                    onChange={onChangeName} 
                />
            </FormItem>

            <FormItem>
                <Select value={param.personId ? String(param.personId) : ''} onChange={onChangeId} >
                    <Select.Option value={''}>负责人</Select.Option>
                    { users.map(user => <Select.Option key={user.id} value={String(user.id)}>{user.name}</Select.Option>) }
                </Select>
            </FormItem>

        </Form >
    )
}

export default SearchPanel