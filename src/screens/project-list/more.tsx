import { Button, Dropdown, Menu } from "antd"
import AlertModel from "models/alert"
import { IProject, useDeleteProject, useProjectsQuery } from "models/project"
import { FC } from "react"

interface IXTableMore {
    project: IProject
} 

const XTableMore: FC<IXTableMore> = ({project}) => {

    const del = useDeleteProject(
        useProjectsQuery()
    )

    const onEdit = () => {
        AlertModel.projectForm({
            type: 'update',
            id: project.id,
        })
    }
    const onDelete = () => {
        del.mutate(project)
    }

    const menu = <Menu>
        <Menu.Item onClick={onEdit} >编辑</Menu.Item>
        <Menu.Item onClick={onDelete} >删除</Menu.Item>
    </Menu>

    return <Dropdown overlay={menu} >
        <Button type='link' >...</Button>
    </Dropdown>
}

export default XTableMore