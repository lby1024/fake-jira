import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObj } from "utils";
import { useHttp } from "./http"
import useAsync from "./use-async";

function useProjects(params?: Partial<Project>) {
    const client = useHttp();
    const { run, ...res } = useAsync<Project[]>()

    useEffect(() => {
        run(client('projects', {data: cleanObj(params||{})}))
    }, [params])

    return res
}

export default useProjects