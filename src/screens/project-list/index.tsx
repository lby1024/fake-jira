import React, { FC } from 'react'
import { useDebounce, useTitle } from 'utils'
import XList from './table'
import SearchPanel from './search'
import styled from '@emotion/styled';
import {useProjects} from 'utils/use-project'
import useUsers from 'utils/use-users'
import { Button, Row } from 'antd';
import useProjectsParam from './use-projects-param';
import AlertModel from 'models/alert';
import XErrorBox from 'components/err-box';

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
            param={param} 
            setParam={setParams} 
        />
        {
            projects.error && 
            <XErrorBox error={projects.error} />
        }
        <XList 
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