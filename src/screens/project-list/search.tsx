import React, { ChangeEvent, FC } from 'react'
import { UserInfo } from 'models/user';
import { Form, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

interface SearchPanelProps {
    users: UserInfo[]
    param: {
        name: string,
        personId: string,
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
            personId: value
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
                <Select value={param.personId} onChange={onChangeId} >
                    <Select.Option value="">负责人</Select.Option>
                    { users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>) }
                </Select>
            </FormItem>

        </Form >
    )
}

export default SearchPanel