import { useDebounce } from "hooks/use-debounce"
import { useUrlParams } from "hooks/use-params"
import { useMemo } from "react"
import { queryKey } from "tools/react-query"
import { useProjectIdInUrl } from "./utils"

export function useTasksParam() {
    const {params, setParams} = useUrlParams(["name", "processorId", "typeId", "tagId"])
    const debounceParam = useDebounce(params)
    const projectId = useProjectIdInUrl()

    const data = useMemo(() => {
        return {
            ...debounceParam,
            projectId,
            processorId: Number(debounceParam.processorId) || undefined,
            typeId: Number(debounceParam.typeId) || undefined,
            tagId: Number(debounceParam.tagId) || undefined,
        }
    }, [debounceParam, projectId])

    function reset() {
        setParams({
            name: undefined,
            processorId: undefined,
            typeId: undefined,
            tagId: undefined,
        })
    }

    return {
        params: data,
        setParams,
        reset,
    }
}

export function useTasksKey() {
    const {params} = useTasksParam()
    return [queryKey.tasks, params]
}