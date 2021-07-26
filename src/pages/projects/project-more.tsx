import { Button, Dropdown, Menu, Modal } from "antd";
import { FC } from "react";
import AlertModel from "tools/alert";
import { IProject, useDeleteProject } from "tools/project";

interface IXProjectMore {
    project: IProject
}

export const XProjectMore:FC<IXProjectMore> = ({project}) => {

    const { mutateAsync } = useDeleteProject()

    function edit() {
        AlertModel.projectForm(project)
    }

    function deleteProject() {
        Modal.confirm({
            content: '确定要删除吗?',
            onOk() {
                mutateAsync(project)
            }
        })
    }

    const MENU = <Menu>
        <Menu.Item onClick={edit}>编辑</Menu.Item>
        <Menu.Item onClick={deleteProject} >删除</Menu.Item>
    </Menu>

    return <Dropdown overlay={MENU} arrow >
        <Button type="link" >...</Button>
    </Dropdown>
}

export default XProjectMore