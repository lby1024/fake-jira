import React, { FC } from 'react'
import { UserProvider } from './user-cotext'

export const AppProvider: FC = (props) => {
    return (
        <UserProvider>
            {props.children}
        </UserProvider>
    )
}
