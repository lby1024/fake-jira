import { IEpic } from "pages/epic/utils"
import { IProject } from "./project"
import { ITask } from "./task"

class AlertModel {
    static projectForm: (param?: Partial<IProject>) => void
    static taskForm: (param?: Partial<ITask>) => void
    static epicForm: (param?: Partial<IEpic>) => void
    
}

export default AlertModel