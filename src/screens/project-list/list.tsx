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
    return <div>
        {
            list.map(project => <div key={project.id}>{project.name}: {users.find(user => user.id === project.id)?.name || '未知'}</div>)
        }
    </div>
}

export default List