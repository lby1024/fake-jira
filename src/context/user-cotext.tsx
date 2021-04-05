import { FullPageError, FullPageLoading } from 'components/lib'
import User, { UserForm, IUserInfo } from 'models/user'
import React, { FC, useContext } from 'react'
import { useMount } from 'utils'
import useAsync from 'utils/use-async'

const UserContext = React.createContext<{
    user: IUserInfo | null,
    register: (form: UserForm) => Promise<void>,
    login: (form: UserForm) => Promise<void>,
    logout: () => Promise<void>,
}|undefined>(undefined)
UserContext.displayName = 'UserContext'

export const UserProvider: FC = (props) => {
    const user = useAsync<IUserInfo|null>()

    useMount(() => {
        user.run(User.bootstrapUser())
    })

    const register = (form: UserForm) => User.registry(form).then(res => user.setData(res))
    const login = (form: UserForm) => User.login(form).then(user.setData) // 一个意思: .then(res => setUser(res))
    const logout = () => User.logout().then(() => user.setData(null))

    if(user.isIdle || user.isLoading) {
        return <FullPageLoading/>
    }

    if(user.error?.message) {
        return <FullPageError error={user.error?.message} />
    }

    return <UserContext.Provider 
        value={{user: user.data, register, login, logout}} >
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