import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import { FC, useEffect, useMemo } from "react";
import { IProject, useProjects } from "tools/project";
import { useUsers } from "tools/user";
import XProjectMore from "./project-more";
import XSaveProject from "./save";

const XTableProjects:FC = () => {

    const { data: projects } = useProjects()
    const { data: users } = useUsers()

    const dataSource = useMemo(() => {
        if(!projects) return []
        return projects.map(item => ({
            ...item,
            key: item.id
        }))
    }, [projects])

    const Columns: ColumnsType<any> = [
        {
            title: "收藏",
            dataIndex: "save",
            key: "save",
            render() {
                return <XSaveProject isSave={true} />
            }
        },{
            title: "项目名称",
            dataIndex: "name",
            key: "name"
        },{
            title: "部门",
            dataIndex: "organization",
            key: "organization",
        },{
            title: "负责人",
            dataIndex: "administrator",
            key: "administrator",
            render(value, project: IProject) {
                const user = users?.find(user => user.id === project.personId)
                return user?.name || '未知'
            }
        },{
            title: "创建时间",
            dataIndex: "created",
            key: "created",
            render(value) {
                return value ? dayjs(value).format("YYYY-MM-DD") : "无"
            }
        },{
            title: "编辑",
            dataIndex: "edit",
            key: "edit",
            render() {
                return <XProjectMore />
            }
        }
    ]

    return <Table columns={Columns} dataSource={dataSource} pagination={false} />
}

export default XTableProjects