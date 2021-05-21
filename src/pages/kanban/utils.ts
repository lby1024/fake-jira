import { useLocation } from "react-router"
import { useProject } from "tools/project"
import { useMutation, useQuery } from "react-query";
import { queryKey } from "tools/react-query";
import { useHttp } from "tools/request";
import { API } from "tools/api";
import { IKanban } from "tools/kanban";
import { useAddConfig } from "tools/list-config";
/**
 * 获取路由中的projectId
 */
export function useProjectIdInUrl() {
    const {pathname} = useLocation()
    const id = pathname.match(/\/projects\/(\d+)\/kanban/)?.[1]
    return Number(id)
}
/**
 * 
 */
export function useKanbansKey() {
    const projectId = useProjectIdInUrl()
    return [queryKey.kanbans, {id: projectId}]
}
/**
 * 获取projectInfo
 */
export function useProjectInUrl() {
    const projectId = useProjectIdInUrl()
    return useProject(projectId)
}
/**
 * 获取看板列表
 */
export function useKanbans() {
    const http = useHttp()
    const key = useKanbansKey()
    const data = key[1] as object
    function getKanbans() {
        return http(API.kanbans, {data})
    }
    return useQuery<IKanban[]>(key, getKanbans)
}
/**
 * 添加看板
 */
export function useAddKanban() {
    const http = useHttp()
    const kanbansKey = useKanbansKey()
    function addKanban(param: Partial<IKanban>) {
        return http(API.kanbans, {
            method: 'POST',
            data: param,
        })
    }
    return useMutation(addKanban, useAddConfig(kanbansKey))
}