interface Isuccessfail {
    success?: () => void
    fail?: () => void
}

export interface IProjectForm extends Isuccessfail {
    type: 'add' | 'update',
    id?: number
}

export interface ITaskForm extends Isuccessfail {
    taskId?: number,
}

class AlertModel {
    static projectForm: (params: IProjectForm) => void
    static taskForm: (params: ITaskForm) => void
}

export default AlertModel
