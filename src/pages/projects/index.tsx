import styled from "@emotion/styled";
import { Button, Row } from "antd";
import { useParams } from "hooks/use-params";
import { FC, useEffect } from "react";

const XProjects: FC = () => {

    const {params, setParams} = useParams(['name', 'age'])

    useEffect(() => {
        console.log(params)
        setTimeout(() => {
            setParams({
                name: 'aaa',
                age: "999"
            })
        }, 1000)
    }, [])

    return <Content>
        <Row justify="space-between" align="middle" >
            <h1>项目列表</h1>
            <Button type="link" >创建项目</Button>
        </Row>
        <div>projects</div>
    </Content>
}

export default XProjects

const Content = styled.div`
    padding: 3.2rem;
`