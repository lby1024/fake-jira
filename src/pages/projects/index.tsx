import styled from "@emotion/styled";
import { Button, Row } from "antd";
import { FC, useEffect } from "react";
import XSearch from "./search";
import XTableProjects from "./table";

const XProjects: FC = () => {



    return <Content>
        <Row justify="space-between" align="middle" >
            <h1>项目列表</h1>
            <Button type="link" >创建项目</Button>
        </Row>
        <XSearch />
        <XTableProjects />
    </Content>
}

export default XProjects

const Content = styled.div`
    padding: 3.2rem;
`