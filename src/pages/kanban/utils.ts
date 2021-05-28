import { useLocation } from "react-router"

/**
 * 获取路由中的projectId
 */
 export function useProjectIdInUrl() {
    const {pathname} = useLocation()
    const id = pathname.match(/\/projects\/(\d+)\/kanban/)?.[1]
    return Number(id)
}

export function  moveIitem(arr: any[], from: number, to: number, type: "after"|"before") {
    arr = [...arr]
    // console.log(arr.map(item => item.id), '--- 111');
    // console.log(from, '--- from');
    // console.log(to, '--- to');
    const target = arr[from]
    arr[from] = null
    const index = type === "after" ? to+1 : to
    arr.splice(index, 0, target)
    arr = arr.filter(item => item)
    // console.log(arr.map(item => item.id), '--- 222');
    return arr
}