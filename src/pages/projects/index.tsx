import styled from "@emotion/styled";
import { Button, Row } from "antd";
import { useTitle } from "hooks/use-title";
import { FC, useEffect } from "react";
import AlertModel from "tools/alert";
import XSearch from "./search";
import XTableProjects from "./table";

const XProjects: FC = () => {

    useTitle("项目列表")

    return <Content>
        <Row justify="space-between" align="middle" >
            <h1>项目列表</h1>
            <Button type="link" onClick={() => AlertModel.projectForm()} >创建项目</Button>
        </Row>
        <XSearch />
        <XTableProjects />
    </Content>
}

export default XProjects

const Content = styled.div`
    padding: 3.2rem;
`