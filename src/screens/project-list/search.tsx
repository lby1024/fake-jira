import React, { ChangeEvent, FC } from 'react'
import { UserInfo } from 'models/user';
import { Input, Select } from 'antd';

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
        <form>
            <Input type="text" value={param.name} onChange={onChangeName} />
            <Select value={param.personId} onChange={onChangeId} >
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </form>
    )
}

export default SearchPanel