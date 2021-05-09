import { Button, Dropdown, Menu, Modal } from "antd";
import { IKanban, useDeleteKanban } from "models/kanban";
import { FC } from "react";

interface IXMoreKanban {
    info: IKanban
}

const XMoreKanban: FC<IXMoreKanban> = ({info}) => {

    const {mutate: deleteKanban} = useDeleteKanban()
    const onDelete = () => {
        Modal.confirm({
            title: '确认删除看板吗?',
            onOk() {
                deleteKanban(info)
            }
        })
    }

    const MENU = <Menu>
        <Menu.Item onClick={onDelete}>删除</Menu.Item>
    </Menu>

    return <Dropdown overlay={MENU} >
        <Button type='link' >...</Button>
    </Dropdown>
}

export default XMoreKanban