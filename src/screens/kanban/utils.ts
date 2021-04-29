import { useProject } from "models/project";
import { useLocation } from "react-router";

export function useProjectIdInUrl() {
    const {pathname} = useLocation()
    const id = pathname.match(/\/projects\/(\d+)\/kanban/)?.[1]
    return Number(id)
}

export function useProjectInUrl() {
    const projectId = useProjectIdInUrl()
    return useProject(projectId)
}