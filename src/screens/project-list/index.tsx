import React, { FC } from 'react'
import { useDebounce, useTitle } from 'utils'
import List from './list'
import SearchPanel from './search'
import styled from '@emotion/styled';
import useProjects from 'utils/use-projects'
import useUsers from 'utils/use-users'
import { Typography } from 'antd';
import useUrlParams from 'utils/use-url-params';
import useProjectsParam from './use-projects-param';

const PageProjectList: FC = () => {
    useTitle('项目列表')
    const {param, setParams} = useProjectsParam()
    const projects = useProjects(useDebounce(param))
    const users = useUsers()

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users.data || []} param={param} setParam={setParams} />
        {
            projects.error && 
            <Typography.Text type='danger' >{projects.error.message}</Typography.Text>
        }
        <List 
            users={users.data || []} 
            list={projects.data || []} 
            loading={projects.isLoading}
        />
    </Container>
}

export default PageProjectList

const Container = styled.div`
padding: 3.2rem;
`