import styled from "@emotion/styled";
import { Popover, Typography, List } from "antd";
import { FC } from "react";
import { useUsers } from "tools/user";

const XHeadUsers:FC = () => {

    const { data: users, refetch } = useUsers()

    const CONTEENT = <Content>
        <Typography.Text type="secondary" >组员列表</Typography.Text>
        <List>
            {users?.map(user => <List.Item>{user.name}</List.Item>)}
        </List>
    </Content>

    return <Popover content={CONTEENT} onVisibleChange={() => refetch()} >
        <span>成员</span>
    </Popover>
}

export default XHeadUsers

const Content = styled.div`
    min-width: 15rem;
`