import { QueryKey, useQueryClient } from "react-query"

export enum EQueryKey {
    projects = 'projects',
    project = 'project',
    kanbans = 'kanbans',
    tasks = 'tasks',
    task = 'task',
    taskTypes = 'taskTypes',
}
type TCallBack = (target: any, old?: any[]) => any[]

function useConfig(queryKey: QueryKey, callback: TCallBack) {
    const queryClient = useQueryClient()
    return {
        onMutate: async (params: any) => {
            const preData = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(params, old)
            })
            return {preData}
        },
        onError: (err: any, newItem: any, context: any) => {
            queryClient.setQueryData(queryKey, context.preData)
        },
        onSuccess: () => queryClient.invalidateQueries(queryKey)
    }
}
export function useAddConfig(queryKey: QueryKey) {
    return useConfig(queryKey, (target, old) => {
        old = old || []
        return [...old, target]
    })
}
export function useDelConfig(queryKey: QueryKey) {
    return useConfig(queryKey, (target, old) => {
        const newItems = old?.filter(item => item.id !== target.id) || []
        return [...newItems]
    })
}
export function useUpdataConfig(queryKey: QueryKey) {
    return useConfig(queryKey, (target, old) => {
        const newItems = old?.map(item => {
            return item.id === target.id 
            ? {...item, ...target} 
            : item
        }) || []
        return [...newItems]
    })
}