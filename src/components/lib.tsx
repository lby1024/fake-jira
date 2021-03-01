import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'
import { FC } from 'react'

const FullPage = styled.div`
    height: 100vh;
    width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FullPageLoading = () => {
    return <FullPage>
        <Spin size='large' />
    </FullPage>
}

interface IFullPageError {
    error: string
}

export const FullPageError: FC<IFullPageError> = (props) => {
    return <FullPage>
        <DevTools />
        <Typography.Text type='danger' >{props.error}</Typography.Text>
    </FullPage>
}