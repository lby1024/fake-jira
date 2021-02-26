import { Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/lib/table'
import dayjs from 'dayjs'
import { IUserInfo } from 'models/user'
import React, { FC, useMemo } from 'react'

export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: string;
}

interface ListProps extends TableProps<Project> {
    list: Project[];
    users: IUserInfo[]
}

const List: FC<ListProps> = ({list, users, ...props}) => {
    const columns: ColumnsType<Project> = [
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
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
            dataIndex: 'time',
            key: 'time',
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

export default List