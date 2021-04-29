import { Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/lib/table'
import XCollection from 'components/collection'
import dayjs from 'dayjs'
import { IProject, useEditProject, useProjectsQuery } from 'models/project'
import { IUserInfo } from 'models/user'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import XTableMore from './more'

interface ListProps extends TableProps<IProject> {
    list: IProject[];
    users: IUserInfo[];
}

const XList: FC<ListProps> = ({list, users, ...props}) => {
    /**
     * 编辑
     */
    const project = useEditProject(
        useProjectsQuery()
    )
    /**
     * 收藏/取消收藏
     */
    const onSave = (id: number) => (pin: boolean) => {
        project.mutate({id, pin})
    }
    const columns: ColumnsType<IProject> = [
        {
            title: <XCollection checked={true} />,
            dataIndex: 'pin',
            key: 'pin',
            render(value, project) {
               return <XCollection checked={project.pin} onCheckedChange={onSave(project.id)} />
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
        },{
            title: '编辑',
            render(value, project) {
                return <XTableMore project={project} />
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