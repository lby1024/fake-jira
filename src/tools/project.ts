import { useDebounce } from "hooks/use-debounce"
import { useUrlParams } from "hooks/use-params"
import { useMemo } from "react"
import { useMutation, useQuery } from "react-query"
import { API } from "./api"
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

    return {}
}