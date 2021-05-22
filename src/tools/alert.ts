import { IProject } from "./project"
import { ITask } from "./task"

class AlertModel {
    static projectForm: (param?: Partial<IProject>) => void
    static taskForm: (param?: Partial<ITask>) => void
}

export default AlertModel