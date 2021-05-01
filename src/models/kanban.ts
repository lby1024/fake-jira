import { useMutation, useQuery } from "react-query";
import { useProjectIdInUrl } from "screens/kanban/utils";
import { useHttp } from "utils/http";
import { EQueryKey, useAddConfig } from "./query-key";

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
  const queryKey = useKanbanQueryKey()
  const getData = () => client('kanbans', {data: params})
  return useQuery<IKanban[]>(queryKey, getData)
}

export function useAddKanban() {
  const client = useHttp()
  const queryKey = useKanbanQueryKey()

  const addTask = (params: Partial<IKanban>) => client(`kanbans`, {
    data: params,
    method: "POST",
  })

  return useMutation(addTask, useAddConfig(queryKey))
}
