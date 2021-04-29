import styled from "@emotion/styled";
import { Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PEpic from "screens/epic";
import PKanban from "screens/kanban";

const PProject: FC = () => {

    return <CSS>
        <Layout className='layout' >
            <Sider theme='light' >
                <Menu defaultSelectedKeys={['kanban']} mode='inline' style={{height: '100%'}} >
                    <Menu.Item key='kanban' >kanban</Menu.Item>
                    <Menu.Item key='epic'>epic</Menu.Item>
                </Menu>
            </Sider>

            <Content className='content' >
                <Routes>
                    <Route path='/kanban' element={<PKanban/>} />
                    <Route path='/epic' element={<PEpic/>} />
                    <Navigate to={window.location.pathname+'/kanban'} replace={true} />
                </Routes>
            </Content>
        </Layout>
    </CSS>
}

export default PProject

const CSS = styled.div`
    .layout {
        height: calc(100vh - 6rem);
    }
    .content {
        overflow: auto;
        background-color: #fff;
        padding: 3rem;
    }
`