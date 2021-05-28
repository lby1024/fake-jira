import { useProjectIdInUrl } from "pages/kanban/utils";
import { useMutation, useQuery } from "react-query";
import { API } from "tools/api";
import { useAddConfig, useDeleteConfig } from "tools/list-config";
import { queryKey } from "tools/react-query";
import { useHttp } from "tools/request";

export interface IEpic {
    id: number;
    name: string;
    projectId: number;
    start: number;  // 开始时间
    end: number;    // 结束时间
}

export function useEpics() {
    const http = useHttp()
    const projectId = useProjectIdInUrl()
    const param = {projectId}
    return useQuery([queryKey.epics, param], async () => {
        return await http(API.epics, {data: param})
    })
}

export function useAddEpic() {
    const http = useHttp()
    const projectIcd = useProjectIdInUrl()
    const param = {projectIcd}
    const key = [queryKey.epics, param]
    async function addEpic(param: Partial<IEpic>) {
        return await http(API.epics, {
            method: "POST",
            data: param
        })
    }
    return useMutation(addEpic, useAddConfig(key))
}

export function useDeleteEpic() {
    const http = useHttp()
    const projectIcd = useProjectIdInUrl()
    const param = {projectIcd}
    const key = [queryKey.epics, param]
    async function deleteEpic(param: Partial<IEpic>) {
        return await http(`${API.epics}/${param.id}`, {
            method: "DELETE"
        })
    }
    return useMutation(deleteEpic, useDeleteConfig(key))
}