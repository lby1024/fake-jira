import React, { ChangeEvent, FC } from 'react'
import { UserInfo } from 'models/user';

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
    const onChangeId = (e: ChangeEvent<HTMLSelectElement>) => {
        setParam({
            ...param,
            personId: e.target.value
        })
    }

    return (
        <form>
            <input type="text" value={param.name} onChange={onChangeName} />
            <select value={param.personId} onChange={onChangeId} >
                <option value="">负责人</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </form>
    )
}

export default SearchPanel