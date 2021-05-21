import styled from "@emotion/styled";
import { Layout } from "antd";
import { useTitle } from "hooks/use-title";
import XEpic from "pages/epic";
import XKanban from "pages/kanban";
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import XMenu from "./menu";

const { Sider, Content } = Layout

const XTaskRouter:FC = () => {

    useTitle("项目管理")
    
    return <XLayout>
        <Sider theme="light" >
            <XMenu/>
        </Sider>

        <Content className="content">
            <Routes>
                <Route path='/kanban' element={<XKanban/>} />
                <Route path='/epic' element={<XEpic/>} />
                <Navigate to={window.location.pathname+'/kanban'} replace={true} />
            </Routes>
        </Content>
    </XLayout>
}

export default XTaskRouter

const XLayout = styled(Layout)`
    height: calc(100vh - 6rem);
    .content {
        background-color: #fff;
        overflow: hidden;
    }
`