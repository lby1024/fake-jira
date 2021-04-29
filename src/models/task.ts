import { useQuery } from "react-query";
import { useHttp } from "utils/http";
import { EQueryKey } from "./query-key";

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

export const useTasks = (param?: Partial<ITask>) => {
  const client = useHttp();

  return useQuery<ITask[]>([EQueryKey.tasks, param], () =>
    client("tasks", { data: param })
  );
};
  