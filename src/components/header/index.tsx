import { FC } from "react";
import {ReactComponent as LOGO} from 'assets/logo.svg'
import { Dropdown, Menu } from 'antd';
import { useUser } from "context/user-cotext";
import styled from '@emotion/styled';

const XHeader: FC = () => {
    const { logout, user } = useUser()
    
    const MENULIST = <Menu>
        <Menu.Item key={"logout"} onClick={logout} >
            登出
        </Menu.Item>
    </Menu>

    return (
        <Container>
            <div>
                <LOGO width="8rem" color="rgb(38, 132, 255)" />
            </div>
            <div>项目</div>
            <div>用户</div>
            <div></div>
            <Dropdown overlay={MENULIST} >
                <span>Hi, {user?.name}</span>
            </Dropdown>
        </Container>
    )
}

export default XHeader

const Container = styled.div`
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    height: 6rem;
    display: grid;
    grid-template-columns: 18rem 100px 100px 1fr 100px;
    grid-template-rows: 1fr;
    > * {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`