import { useDebounce } from "hooks/use-debounce"
import { useUrlParams } from "hooks/use-params"
import { useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { API } from "./api"
import { useEditConfig } from "./list-config"
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
    const debounceParam = useDebounce(params)
    const newParam = useMemo(() => ({
        ...params,
        personId: Number(params.personId) || undefined
    }), [debounceParam])

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

    async function getProjects() {
        const res = await http(API.projects, {
            data: params
        })
        return res
    }

    return useQuery<IProject[]>([queryKey.projects, params], getProjects)
}

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
