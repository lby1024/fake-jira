import { render } from "@testing-library/react";
import { Spin, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import React, { FC, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { IProject, useProjects } from "tools/project";
import { useUsers } from "tools/user";
import XProjectMore from "./project-more";
import XSaveProject from "./save";

const XTableProjects:FC = () => {

    const { data: projects, isLoading } = useProjects()
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
            title: <XSaveProject project={{pin: true}} />,
            dataIndex: "pin",
            key: "pin",
            render(value, project) {
                return <XSaveProject project={project} />
            }
        },{
            title: "项目名称",
            dataIndex: "name",
            key: "name",
            render(value, project) {
                return <Link to={`/projects/${Number(project.id)}`} >{value}</Link>
            }
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
                const time = value || new Date()
                return dayjs(time).format("YYYY-MM-DD")
            }
        },{
            title: "编辑",
            dataIndex: "edit",
            key: "edit",
            render(value, project) {
                return <XProjectMore project={project} />
            }
        }
    ]

    return <Table columns={Columns} dataSource={dataSource} pagination={false} loading={isLoading} />
}

export default XTableProjects