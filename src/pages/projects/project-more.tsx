import { Button, Dropdown, Menu } from "antd";

export function XProjectMore() {

    const MENU = <Menu>
        <Menu.Item>编辑</Menu.Item>
        <Menu.Item>删除</Menu.Item>
    </Menu>

    return <Dropdown overlay={MENU} arrow >
        <Button type="link" >...</Button>
    </Dropdown>
}

export default XProjectMore