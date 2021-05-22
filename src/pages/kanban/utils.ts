import { useLocation } from "react-router"

/**
 * 获取路由中的projectId
 */
 export function useProjectIdInUrl() {
    const {pathname} = useLocation()
    const id = pathname.match(/\/projects\/(\d+)\/kanban/)?.[1]
    return Number(id)
}