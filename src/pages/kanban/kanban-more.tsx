import { Button, Dropdown, Menu } from "antd";
import { FC } from "react";

interface IXKanbanMore {

}

const XKanbanMore:FC = () => {

    const MENU = <Menu>
        <Menu.Item>删除</Menu.Item>
    </Menu>

    return <Dropdown overlay={MENU} arrow >
        <Button type="link" >...</Button>
    </Dropdown>
}

export default XKanbanMore