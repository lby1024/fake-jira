import styled from "@emotion/styled"
import { FC } from "react"
import {ReactComponent as Logo} from "assets/logo.svg"
import { Dropdown, Menu } from "antd"
import { logout, useUser } from "tools/user"

const XHeader:FC = () => {

    const {data: userInfo} = useUser()

    function toHome() {
        window.location.pathname = ""
    }

    const UserMenu = <Menu style={{textAlign: "center"}} >
        <Menu.Item key="logout" onClick={logout} >登出</Menu.Item>
    </Menu>

    return <Content>
        <div onClick={toHome} ><Logo/></div>
        <div>user</div>
        <div>projects</div>
        <div></div>
        <Dropdown overlay={UserMenu} placement="bottomCenter" arrow >
            <span>Hi, {userInfo?.name}</span>
        </Dropdown>
    </Content>
}

export default XHeader

const Content = styled.div`
    padding: 0 3.5rem;
    height: 6rem;
    background-color: #fff;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 8rem 100px 100px 1fr 100px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1) inset;
    > * {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`