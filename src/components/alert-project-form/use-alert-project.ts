import AlertModel, { IProjectForm } from "models/alert"
import { useState } from "react"
import { useAddProject, useEditProject, useProject } from "utils/use-project"

export const useAlertProject = () => {
    const [show, setShow] = useState(false)
    const [params, setParams] = useState<IProjectForm>()
    const project = useProject(params?.id)
    
    AlertModel.projectForm = (params: IProjectForm) => {
        setShow(true)
        setParams(params)
    }

    const close = () => {
        setShow(false)
    }

    return {
        close,
        show,
        params,
        data: project.data,
        isLoading: project.isLoading,
    }
}