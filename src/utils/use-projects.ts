import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "./http"
import useAsync from "./use-async";

function useProjects(params?: Partial<Project>) {
    const client = useHttp();
    return useQuery<Project[], Error>( ['projects', cleanObj(params)], () => 
        client('projects', {data: params})
    )
}

export default useProjects

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