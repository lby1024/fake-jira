import React, { FC } from 'react'
import { UserProvider } from './user-cotext'
import { QueryClient, QueryClientProvider } from 'react-query'

export const AppProvider: FC = (props) => {
    return (
        <QueryClientProvider client={new QueryClient()} >
            <UserProvider>{props.children}</UserProvider>
        </QueryClientProvider>
    )
}
