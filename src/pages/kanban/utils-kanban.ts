import { useProject } from "tools/project"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKey } from "tools/react-query";
import { useHttp } from "tools/request";
import { API, ISort } from "tools/api";
import { IKanban } from "tools/kanban";
import { useAddConfig, useDeleteConfig } from "tools/list-config";
import { moveIitem, useProjectIdInUrl } from "./utils";
/**
 * 
 */
export function useKanbansKey() {
    const projectId = useProjectIdInUrl()
    return [queryKey.kanbans, {projectId: projectId}]
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
/**
 * 删除看板
 */
export function useDeleteKanban() {
    const http = useHttp()
    const kanbansKey = useKanbansKey()
    function deleteKanban(param: Partial<IKanban>) {
        return http(`${API.kanbans}/${param.id}`, {
            method: "DELETE"
        })
    }
    return useMutation(deleteKanban, useDeleteConfig(kanbansKey))
}
/**
 * 排序看板
 */
export function useReorderKanban() {
    const http = useHttp()
    const kanbansKey = useKanbansKey()
    const queryClient = useQueryClient()
    async function reorderKanban(params:ISort) {
        const res = await http(API.kanbansReorder, {
            data: params,
            method: "POST"
        })
        return res
    }
    return useMutation(reorderKanban, {
        onMutate(params: ISort) {
            const preKanbans = queryClient.getQueryData(kanbansKey) as IKanban[]
            const newKanbans = sortKanban(preKanbans, params)
            queryClient.setQueryData(kanbansKey, newKanbans)
            return preKanbans
        },
        // onSuccess() {
        //     queryClient.invalidateQueries(kanbansKey)
        // },
        onError(err: Error, param: any, preDate: any) {
            queryClient.setQueryData(kanbansKey, preDate)
        }
    })
}
/**
 * 重新排序kanban
 */
function sortKanban(kanbans: IKanban[], params: ISort) {
    kanbans = [...kanbans]
    const kanbanIds = kanbans.map(item => item.id)
    const fromIndex = kanbanIds.indexOf(params.fromId)
    const toIndex = kanbanIds.indexOf(params.referenceId)
    return moveIitem(kanbans, fromIndex, toIndex, params.type)
}
