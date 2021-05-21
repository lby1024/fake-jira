import { Button, Dropdown, Menu } from "antd";
import { FC } from "react";
import { IKanban } from "tools/kanban";
import { useDeleteProject } from "tools/project";
import { useDeleteKanban } from "./utils";

interface IXKanbanMore {
    kanban: IKanban
}

const XKanbanMore:FC<IXKanbanMore> = ({kanban}) => {

    const { mutate } = useDeleteKanban()

    function deleteKanban() {
        mutate(kanban)
    }

    const MENU = <Menu>
        <Menu.Item onClick={deleteKanban} >删除</Menu.Item>
    </Menu>

    return <Dropdown overlay={MENU} arrow >
        <Button type="link" >...</Button>
    </Dropdown>
}

export default XKanbanMore