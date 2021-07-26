import styled from "@emotion/styled";
import XKanban from "pages/kanban";
import XProjects from "pages/projects";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import XTaskRouter from "router/tasks-router";
import XHeader from "./header";

const XProjectsRouter: FC = () => {
    return <Content>
        <XHeader />
        <Routes>
            <Route path="/projects" element={<XProjects />} />
            <Route path="/projects/:id/*" element={<XTaskRouter />} />
            <Navigate to="/projects" replace={true} />
        </Routes>
    </Content>
}

export default XProjectsRouter

const Content = styled.div`

`