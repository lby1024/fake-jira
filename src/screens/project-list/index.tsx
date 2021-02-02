import React, { FC, useEffect, useState } from 'react'
import { cleanObj, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'
import List from './list'
import SearchPanel from './search'
import styled from '@emotion/styled';

const PageProjectList: FC = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: "",
        personId: "",
    })
    const debouncedParam = useDebounce(param, 200)
    const [list, setList] = useState([])
    const req = useHttp()

    useEffect(() => {
        const data = cleanObj(debouncedParam)
        req('projects', { data }).then(setList)
    }, [debouncedParam])

    useMount(() => {
        req('users').then(setUsers)
    })

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </Container>
}

export default PageProjectList

const Container = styled.div`
padding: 3.2rem;
`