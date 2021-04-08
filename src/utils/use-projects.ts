import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "./http"
import useAsync from "./use-async";

function useProjects(params?: Partial<Project>) {
    const client = useHttp();
    const { run, ...res } = useAsync<Project[]>()
    const getData = () => client('projects', {data: cleanObj(params||{})})

    useEffect(() => {
        run(getData(), {retry: getData})
    }, [params])

    return res
}

export default useProjects

export function useEditProject() {
    const client = useHttp();
    const {run, ...rest} = useAsync()

    const update = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: "PATCH",
            })
        )
    }

    return {
        update,
        ...rest
    }
}