import AlertModel, { IProjectForm } from "models/alert"
import { useProject } from "models/project"
import { EQueryKey } from "models/query-key"
import { useState } from "react"
import { useQueryClient } from "react-query"

export const useAlertProject = () => {
    const queryClient = useQueryClient()
    const [show, setShow] = useState(false)
    const [params, setParams] = useState<IProjectForm>()
    const project = useProject(params?.id)
    
    AlertModel.projectForm = (params: IProjectForm) => {
        setShow(true)
        setParams(params)
    }

    const close = () => {
        setShow(false)
        queryClient.invalidateQueries([EQueryKey.project, params?.id])
    }

    return {
        close,
        show,
        params,
        data: project.data,
        isLoading: project.isLoading,
    }
}