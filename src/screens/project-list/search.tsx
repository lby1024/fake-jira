import React, { ChangeEvent, FC } from 'react'
import { IUserInfo } from 'models/user';
import { Form, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import XIdSelect from 'components/id-select';

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
    
    const onChangeId = (value: number) => {
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
                <XIdSelect 
                    options={users}
                    value={param.personId}
                    defaultName='负责人'
                    onChange={onChangeId}
                />
            </FormItem>

        </Form >
    )
}

export default SearchPanel