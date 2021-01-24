import User, { UserForm, UserInfo } from 'models/user'
import React, { FC, useContext, useState } from 'react'
import { useMount } from 'utils'

const UserContext = React.createContext<{
    user: UserInfo | null,
    register: (form: UserForm) => Promise<void>,
    login: (form: UserForm) => Promise<void>,
    logout: () => Promise<void>,
}|undefined>(undefined)
UserContext.displayName = 'UserContext'

export const UserProvider: FC = (props) => {
    const [user, setUser] = useState<UserInfo|null>(null)

    useMount(() => {
        User.bootstrapUser().then(setUser)
    })

    const register = (form: UserForm) => User.registry(form).then(res => setUser(res))
    const login = (form: UserForm) => User.login(form).then(setUser) // 一个意思: .then(res => setUser(res))
    const logout = () => User.logout().then(() => setUser(null))

    return <UserContext.Provider 
        value={{user, register, login, logout}} >
            {props.children}
    </UserContext.Provider>
}

export const useUser = () => {
    const ctx = useContext(UserContext)
    if(!ctx) {
        throw new Error('useUser 必须在provider 中使用')
    }
    return ctx
}