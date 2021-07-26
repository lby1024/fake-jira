import styled from "@emotion/styled";
import { Typography, List, Divider, Button, Popover } from "antd";
import React, { FC } from "react";
import AlertModel from "tools/alert";
import { useProjects } from "tools/project";

const XHeadProject:FC = () => {

    const { data: projects, refetch } = useProjects()
    const saves = projects?.filter(project => project.pin)

    const CONTENT = <Content>
        <Typography.Text type="secondary" >收藏项目</Typography.Text>
        <List>
            {saves?.map(project => <List.Item key={project.id} >{project.name}</List.Item>)}
        </List>
        <Divider />
        <Button type="text" onClick={() => AlertModel.projectForm()} >+创建项目</Button>
    </Content>

    return <Popover content={CONTENT} onVisibleChange={() => refetch()} >
        <span>项目</span>
    </Popover>
}

export default XHeadProject

const Content = styled.div`
    min-width: 15rem;
`