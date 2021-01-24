import { useUser } from 'context/user-cotext'
import React, { FC } from 'react'
import PageProjectList from 'screens/project-list'

const AuthenticatedApp: FC = () => {
    const { logout } = useUser()

    return <div>
        <div onClick={logout} >登出</div>
        <PageProjectList />
    </div>
}

export default AuthenticatedApp