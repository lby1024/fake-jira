import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectIdInUrl } from "screens/kanban/utils";
import { useHttp } from "utils/http";
import { EQueryKey, useAddConfig } from "./query-key";
import { ITask } from "./task";

export interface IKanban {
  id: number;
  name: string;
  projectId: number;
}

export function useKanbanQueryKey() {
  const projectId = useProjectIdInUrl()
  return [EQueryKey.kanbans, {projectId}]
}
 
export function useKanbans(params?: Partial<IKanban>) {
  const client = useHttp()
  const getData = () => client('kanbans', {data: params})
  return useQuery<IKanban[]>([EQueryKey.kanbans, params], getData)
}

export function useAddKanban() {
  const client = useHttp()
  const queryKey = useKanbanQueryKey()

  const addTask = (params: Partial<ITask>) => client(`tasks`, {
    data: params,
    method: "POST",
  })

  return useMutation(addTask, useAddConfig(queryKey))
}
