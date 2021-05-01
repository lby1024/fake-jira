import { useMutation, useQuery } from "react-query";
import useTasksParam, { useProjectIdInUrl } from "screens/kanban/utils";
import { useHttp } from "utils/http";
import { EQueryKey, useAddConfig } from "./query-key";

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

export const useTaskQueryKey = () => {
  const { param } = useTasksParam()  
  return [EQueryKey.tasks, param]
}


export const useTasks = () => {
  const client = useHttp();
  
  const queryKey = useTaskQueryKey()
  const data = queryKey[1] as any
  
  return useQuery<ITask[]>(queryKey, () =>
    client("tasks", { data })
  );
};

export const useAddTask = () => {
  const client = useHttp();
  const queryKey = useTaskQueryKey()

  const addTask = (param: Partial<ITask>) => client('tasks', {
    data: param,
    method: 'POST'
  })

  return useMutation(addTask, useAddConfig(queryKey))
}

export const useTaskTypes = () => {
  const client = useHttp();
  return useQuery<ITaskType[]>([EQueryKey.taskTypes], () => client("taskTypes"));
};
  