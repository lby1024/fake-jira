import { Button, Dropdown, Menu } from "antd"
import AlertModel from "models/alert"
import { IProject } from "models/project"
import { FC } from "react"
import { useDeleteProject, useProjectsQuery } from "utils/use-project"

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