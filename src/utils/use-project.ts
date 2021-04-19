import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "./http"
/**
 * 获取所有projects
 */
export function useProjects(params?: Partial<Project>) {
    const client = useHttp();
    return useQuery<Project[], Error>( ['projects', cleanObj(params)], () => 
        client('projects', {data: params})
    )
}
/**
 * 更新project
 */
export function useEditProject() {
    const client = useHttp();
    const queryClient = useQueryClient()

    const updata = (params: Partial<Project>) => client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
    })
    
    return useMutation(updata, {
        onSuccess: () => queryClient.invalidateQueries('projects')
    })
}
/**
 * 获取某一项project
 */
export function useProject(id?: number) {
    const client = useHttp();
    const getData = () => client(`projects/${id}`)

    return useQuery(['projects', id], getData, {
        enabled: !!id // id为空时不触发
    })
}
/**
 * 添加project
 */
export function addProject() {
    const client = useHttp()
    const queryClient = useQueryClient()

    const add = (params: Partial<Project>) => client('projects', {
        data: params,
        method: 'POST',
    })

    return useMutation(add, {
        onSuccess: () => queryClient.invalidateQueries('projects')
    })
}