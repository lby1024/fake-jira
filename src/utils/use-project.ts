import { useMemo } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import useProjectsParam from "screens/project-list/use-projects-param";
import { cleanObj } from "utils";
import { useHttp } from "./http"
/**
 * 获取所有projects
 */
export function useProjects(params?: Partial<Project>) {
    const client = useHttp();

    const data = useMemo(() => {
        return cleanObj(params)
    }, [params])

    const getData = () => client('projects', {data})

    return useQuery<Project[], Error>( ['projects', data], getData)
}
/**
 * 获取某一项project
 */
 export function useProject(id?: number) {
    const client = useHttp();
    const getData = () => client(`projects/${id}`)

    return useQuery(['project', id], getData, {
        enabled: !!id // id为空时不触发
    })
}
/**
 * 更新project
 */
export function useEditProject(queryKey: QueryKey) {
    const client = useHttp();
    const queryClient = useQueryClient()

    const updata = (params: Partial<Project>) => client(`projects/${params.id}`, {
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
    const queryClient = useQueryClient()

    const add = (params: Partial<Project>) => client('projects', {
        data: params,
        method: 'POST',
    })

    return useMutation(add, useAddConfig(queryKey))
}
/**
 * 删除project
 */
export function useDeleteProject(queryKey: QueryKey) {
    const client = useHttp()
    const queryClient = useQueryClient()

    const del = (params: Partial<Project>) => client(`projects/${params.id}`, {
        method: "DELETE",
    })

    return useMutation(del, useDelConfig(queryKey))
}

type TCallBack = (target: Partial<Project>, old: Project[]) => Project[]

function useConfig(queryKey: QueryKey, callback: TCallBack) {
    const queryClient = useQueryClient()
    return {
        onMutate: async (params: Partial<Project>) => {
            const preData = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old) => {
                const oldData = old as Project[]
                return callback(params, oldData)
            })
            return {preData}
        },
        onError: (err: any, newItem: any, context: any) => {
            queryClient.setQueryData(queryKey, context.preData)
        },
        onSuccess: () => queryClient.invalidateQueries(queryKey)
    }
}

function useAddConfig(queryKey: QueryKey) {
    return useConfig(queryKey, (target, old) => {
        const item  = target as Project
        old = old || []
        return [...old, item]
    })
}
function useDelConfig(queryKey: QueryKey) {
    return useConfig(queryKey, (target, old) => {
        const newItems = old.filter(item => item.id !== target.id)
        return [...newItems]
    })
}
function useUpdataConfig(queryKey: QueryKey) {
    return useConfig(queryKey, (target, old) => {
        const newItems = old?.map(item => {
            return item.id === target.id 
            ? {...item, ...target} 
            : item
        })
        return [...newItems]
    })
}

export function useProjectsQuery() {
    const { param } = useProjectsParam()
    return ['projects', cleanObj(param)]
}