import React, { FC } from 'react'
import { useDebounce, useTitle } from 'utils'
import List from './list'
import SearchPanel from './search'
import styled from '@emotion/styled';
import useProjects from 'utils/use-projects'
import useUsers from 'utils/use-users'
import { Button, Row, Typography } from 'antd';
import useProjectsParam from './use-projects-param';
import AlertModel from 'models/alert';

const PageProjectList: FC = () => {
    useTitle('项目列表')
    const {param, setParams} = useProjectsParam()
    const projects = useProjects(useDebounce(param))
    const users = useUsers()

    const addProject = () => {
        AlertModel.projectForm({
            type: 'add'
        })
    }

    return <Container>
        <Row justify='space-between' align='middle' >
            <h1>项目列表</h1>
            <Button type='link' onClick={addProject} >创建项目</Button>
        </Row>
        <SearchPanel 
            users={users.data || []} 
            param={param} 
            setParam={setParams} 
        />
        {
            projects.error && 
            <Typography.Text type='danger' >{projects.error.message}</Typography.Text>
        }
        <List 
            users={users.data || []} 
            list={projects.data || []} 
            loading={projects.isLoading}
            refresh={projects.retry}
        />
    </Container>
}

export default PageProjectList

const Container = styled.div`
padding: 3.2rem;
`