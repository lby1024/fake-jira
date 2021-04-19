import { Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/lib/table'
import XCollection from 'components/collection'
import dayjs from 'dayjs'
import { IUserInfo } from 'models/user'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useEditProject } from 'utils/use-projects'

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: string;
}

interface ListProps extends TableProps<Project> {
    list: Project[];
    users: IUserInfo[];
}

const XList: FC<ListProps> = ({list, users, ...props}) => {

    const project = useEditProject()
    const onCheckedChange = (id: number) => (pin: boolean) => {
        project.mutate({id, pin})
    }
    const columns: ColumnsType<Project> = [
        {
            title: <XCollection checked={true} />,
            dataIndex: 'pin',
            key: 'pin',
            render(value, project) {
               return <XCollection checked={project.pin} onCheckedChange={onCheckedChange(project.id)} />
            }
        },
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
            render(value, project) {
                return <Link to={String(project.id)} >{value}</Link>
            }
        },{
            title: '部门',
            dataIndex: 'organization',
            key: 'organization'
        },{
            title: '负责人',
            dataIndex: 'administrator',
            key: 'administrator',
            render(value, project) {
                return users.find(user => user.id === project.personId)?.name || '未知'
            }
        },{
            title: '创建时间',
            dataIndex: 'created',
            key: 'created',
            render(v, project) {
                return project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'
            }
        }
    ]

    const dataSource = useMemo(() => {
        return list.map(item => ({key: item.id, ...item}))
    }, [list])

    return <div>
        <Table 
            pagination={false} 
            dataSource={dataSource}
            columns={columns} 
            {...props}
        />
    </div>
}

export default XList