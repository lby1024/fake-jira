import { useProject } from "models/project";
import { useMemo } from "react";
import { useLocation } from "react-router";
import useUrlParams from "utils/use-url-params"

export function useProjectIdInUrl() {
    const {pathname} = useLocation()
    const id = pathname.match(/\/projects\/(\d+)\/kanban/)?.[1]
    return Number(id)
}

export function useProjectInUrl() {
    const projectId = useProjectIdInUrl()
    return useProject(projectId)
}


export default function useKanbanParam() {
    const [param, setParams] = useUrlParams(['name', 'processorId', 'typeId', 'tagId'])

    const p = useMemo(() => {
        return {
            ...param,
            processorId: Number(param.processorId) || undefined,
            typeId: Number(param.typeId) || undefined,
            tagId: Number(param.tagId) || undefined,
        }
    }, [param])

    const reset = () => {
        setParams({
            name: undefined,
            processorId: undefined,
            typeId: undefined,
            tagId: undefined,
        })
    }

    return {
        param: p,
        setParams,
        reset,
    }
}