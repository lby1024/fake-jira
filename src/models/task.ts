import { useMutation, useQuery } from "react-query";
import useTasksParam, { useProjectIdInUrl } from "screens/kanban/utils";
import { useHttp } from "utils/http";
import { EQueryKey, useAddConfig, useUpdataConfig } from "./query-key";

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

export interface ITaskType {
  id: number;
  name: string;
}
/**
 * tasks 的querykey
 */
export const useTaskQueryKey = () => {
  const { param } = useTasksParam()  
  return [EQueryKey.tasks, param]
}
/**
 * 获取 tasks
 */
export const useTasks = () => {
  const client = useHttp();
  
  const queryKey = useTaskQueryKey()
  const data = queryKey[1] as any
  
  return useQuery<ITask[]>(queryKey, () =>
    client("tasks", { data })
  );
};
/**
 * 获取 tasktypes
 */
 export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<ITaskType[]>([EQueryKey.taskTypes], () => client("taskTypes"));
};
/**
 * 获取某一个 task
 */
 export const useTask = (id?: number) => {
  const client = useHttp();
  const getData = () => client(`tasks/${id}`)

  return useQuery<ITask>([EQueryKey.task, {id}], getData, {
    enabled: !!id
  })
}
/**
 * 添加 task
 */
export const useAddTask = () => {
  const client = useHttp();
  const queryKey = useTaskQueryKey()

  const addTask = (param: Partial<ITask>) => client('tasks', {
    data: param,
    method: 'POST'
  })

  return useMutation(addTask, useAddConfig(queryKey))
}
/**
 * 编辑 task
 */
export const useEditTask = () => {
  const client = useHttp()
  const queryKeyt = useTaskQueryKey()

  const editTask = (param: Partial<ITask>) => client(`tasks/${param.id}`, {
    method: 'PATCH',
    data: param,
  })

  return useMutation(
    editTask, 
    useUpdataConfig(queryKeyt)
  )
}