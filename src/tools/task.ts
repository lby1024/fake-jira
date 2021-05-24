import { useTasksKey } from "pages/kanban/utils-task"
import { useMutation, useQuery } from "react-query"
import { API, IGetTasks } from "./api"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./list-config"
import { queryKey } from "./react-query"
import { useHttp } from "./request"

export interface ITask {
    id: number;
    name: string;
    // 经办人
    processorId: number;
    projectId: number;
    // 任务组
    epicId: number;
    kanbanId: number;
    // bug or task
    typeId: number;
    note: string;
}
/**
 * 获取tasks
 */
 export function useTasks() {
    const http = useHttp()
    const key = useTasksKey()
    const data = key[1] as any
    async function getTasks() {
        const res = await http(API.tasks, {data})
        return res
    }
    return useQuery<ITask[]>(key, getTasks)
}
/**
 * 添加task
 */
export function useAddTask() {
    const http = useHttp()
    const key = useTasksKey()
    async function  addTask(params: Partial<ITask>) {
        return await http(API.tasks, {
            method: "POST",
            data: params
        })
    }
    return useMutation(addTask, useAddConfig(key))
}
/**
 * 编辑 task
 */
export function useEditTask() {
    const http = useHttp()
    const key = useTasksKey()
    
    async function editTask(params: Partial<ITask>) {
        const res = await http(`${API.tasks}/${params.id}`, {
            method: "PATCH",
            data: params
        })
        return res
    }
    return useMutation(editTask, useEditConfig(key))
}
/**
 * 删除 task
 */
export function  useDeleteTask() {
    const http = useHttp()
    const key = useTasksKey()
    async function deleteTask(params: Partial<ITask>) {
        return await http(`${API.tasks}/${params.id}`, {
            method: "DELETE"
        })
    }
    return useMutation(deleteTask, useDeleteConfig(key))
}
/**
 * 获取tasks types
 */
export function  useTaskTypes() {
    const http = useHttp()
    async function getTaskTypes() {
        return await http(API.taskTypes)
    }
    return useQuery([queryKey.taskTypes], getTaskTypes)
}