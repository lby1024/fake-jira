import { EQueryKey, useAddConfig, useDelConfig, useUpdataConfig } from "models/query-key";
import { useMemo } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import useProjectsParam from "screens/project-list/use-projects-param";
import { cleanObj } from "utils";
import { useHttp } from "utils/http";

export interface IProject {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: string;
}
/**
 * 获取所有projects
 */
export function useProjects(params?: Partial<IProject>) {
    const client = useHttp();

    const data = useMemo(() => {
        return cleanObj(params)
    }, [params])

    const getData = () => client(EQueryKey.projects, {data})

    return useQuery<IProject[], Error>( [EQueryKey.projects, data], getData)
}
/**
 * 获取某一项project
 */
 export function useProject(id?: number) {
    const client = useHttp();
    const getData = async () => {
        const res = await client(`${EQueryKey.projects}/${id}`)
        return res
    }

    return useQuery([EQueryKey.project, id], getData, {
        enabled: !!id // id为空时不触发
    })
}
/**
 * 更新project
 */
export function useEditProject(queryKey: QueryKey) {
    const client = useHttp();

    const updata = (params: Partial<IProject>) => client(`${EQueryKey.projects}/${params.id}`, {
        data: params,
        method: 'PATCH'
    })
    
    return useMutation(updata, useUpdataConfig(queryKey))
}
/**
 * 添加project
 */
export function useAddProject(queryKey: QueryKey) {
    const client = useHttp()

    const add = (params: Partial<IProject>) => {
        return client(EQueryKey.projects, {
            data: params,
            method: 'POST',
        })
    }

    return useMutation(add, useAddConfig(queryKey))
}
/**
 * 删除project
 */
export function useDeleteProject(queryKey: QueryKey) {
    const client = useHttp()

    const del = (params: Partial<IProject>) => client(`${EQueryKey.projects}/${params.id}`, {
        method: "DELETE",
    })

    return useMutation(del, useDelConfig(queryKey))
}

export function useProjectsQuery() {
    const { param } = useProjectsParam()
    return [EQueryKey.projects, cleanObj(param)]
}