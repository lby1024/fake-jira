import { useDebounce } from "hooks/use-debounce"
import { useUrlParams } from "hooks/use-params"
import { useMemo } from "react"
import { useMutation, useQuery } from "react-query"
import { API } from "./api"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./list-config"
import { queryKey } from "./react-query"
import { useHttp } from "./request"

export interface IProject {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: string;    
}
/**
 * 
 */
export function useProjectsParam() {
    const { params, setParams } = useUrlParams(["name", "personId"])
    const newParam = useMemo(() => ({
        ...params,
        personId: Number(params.personId) || undefined
    }), [params])
    
    return {
        params: newParam,
        setParams
    }
}
/**
 * 
 */
export const useProjects = () => {
    const http = useHttp()
    const { params } = useProjectsParam()
    const data = useDebounce(params)

    async function getProjects() {
        const res = await http(API.projects, { data })
        return res
    }

    return useQuery<IProject[]>([queryKey.projects, data], getProjects)
}
/**
 * 获取项目详情
 */
export const useProject = (id?: number) => {
    const http = useHttp()

    async function getProject() {
        return await http(`${API.projects}/${id}`)
    }
    return useQuery<IProject>([queryKey.project, {id}], getProject, {
        enabled: !!id,
    })
}
/**
 * 编辑project
 */
export const useEditProject = () => {
    const { params } = useProjectsParam()
    const key = [queryKey.projects, params]
    const http = useHttp()

    async function editProject(project: Partial<IProject>) {
        return await http(`${API.projects}/${project.id}`, {
            method: "PATCH",
            data: project,
        })
    }
    return useMutation(editProject, useEditConfig(key))
}
/**
 * 添加project
 */
export function useAddProject() {
    const { params } = useProjectsParam()
    const key = [queryKey.projects, params]
    const http = useHttp()

    async function addProject(params: Partial<IProject>) {
        return await http(API.projects, {
            method: "POST",
            data: params
        })
    }
    return useMutation(addProject, useAddConfig(key))
}
/**
 * 删除project
 */
export function useDeleteProject() {
    const { params } = useProjectsParam()
    const key = [queryKey.projects, params]
    const http = useHttp()

    async function deleteProject(params: Partial<IProject>) {
        return await http(`${API.projects}/${params.id}`, {
            method: "DELETE"
        })
    }
    return useMutation(deleteProject, useDeleteConfig(key))
}
