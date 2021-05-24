import { useDebounce } from "hooks/use-debounce"
import { useUrlParams } from "hooks/use-params"
import { useMemo } from "react"
import { queryKey } from "tools/react-query"
import { useProjectIdInUrl } from "./utils"

export function useTasksParam() {
    const {params, setParams} = useUrlParams(["name", "processorId", "typeId", "tagId"])
    const projectId = useProjectIdInUrl()

    const data = useMemo(() => {
        return {
            ...params,
            projectId,
            processorId: Number(params.processorId) || undefined,
            typeId: Number(params.typeId) || undefined,
            tagId: Number(params.tagId) || undefined,
        }
    }, [params, projectId])

    const debounceParam = useDebounce(data)

    function reset() {
        setParams({
            name: undefined,
            processorId: undefined,
            typeId: undefined,
            tagId: undefined,
        })
    }

    return {
        params: debounceParam,
        setParams,
        reset,
    }
}

export function useTasksKey() {
    const {params} = useTasksParam()

    const key = useMemo(() => {
        return [queryKey.tasks, params]
    }, [params])

    return key
}