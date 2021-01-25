import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserInfo } from 'models/user'
import React, { FC } from 'react'

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[];
    users: UserInfo[]
}

const List: FC<ListProps> = ({list, users}) => {
    const columns: ColumnsType<Project> = [
        {
            title: '项目名称',
            dataIndex: 'name'
        },{
            title: '负责人',
            render: (value, project) => {
                return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
            }
        }
    ]

    return <div>
        <Table 
            pagination={false} 
            dataSource={list}
            columns={columns} />
    </div>
}

export default List