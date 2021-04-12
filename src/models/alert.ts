interface Isuccessfail {
    success?: () => void
    fail?: () => void
}

interface IProjectForm extends Isuccessfail {
    type: 'add' | 'update',
    id?: number
}

class AlertModel {
    static projectForm: (params: IProjectForm) => void
}

export default AlertModel