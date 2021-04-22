import React, { FC } from 'react'
import { UserProvider } from './user-cotext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

export const AppProvider: FC = (props) => {
    return (
        <QueryClientProvider client={new QueryClient()} >
            <BrowserRouter>
                <UserProvider>{props.children}</UserProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}
