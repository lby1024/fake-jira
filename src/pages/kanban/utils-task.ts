import { useDebounce } from "hooks/use-debounce";
import { useUrlParams } from "hooks/use-params";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { API, ISort } from "tools/api";
import { queryKey } from "tools/react-query";
import { useHttp } from "tools/request";
import { ITask } from "tools/task";
import { cleanObj } from "tools/utils";
import { moveIitem, useProjectIdInUrl } from "./utils";

export function useTasksParam() {
  const { params, setParams } = useUrlParams([
    "name",
    "processorId",
    "typeId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();

  const data = useMemo(() => {
    return {
      ...params,
      projectId,
      processorId: Number(params.processorId) || undefined,
      typeId: Number(params.typeId) || undefined,
      tagId: Number(params.tagId) || undefined,
    };
  }, [params, projectId]);

  function reset() {
    setParams({
      name: undefined,
      processorId: undefined,
      typeId: undefined,
      tagId: undefined,
    });
  }

  return {
    params: data,
    setParams,
    reset,
  };
}

export function useTasksKey() {
  const { params } = useTasksParam();
  const p = useDebounce(params);

  const key = useMemo(() => {
    return [queryKey.tasks, cleanObj(params)];
  }, [p]); // eslint-disable-line react-hooks/exhaustive-deps

  return key;
}

export function useReorderTask() {
  const http = useHttp();
  const tasksKey = useTasksKey();
  const queryClient = useQueryClient();
  async function reorderTask(params: ISort) {
    const res = await http(API.tasksReorder, {
      data: params,
      method: "POST",
    });
    return res;
  }
  return useMutation(reorderTask, {
    onMutate(params: ISort) {
      const preTasks = queryClient.getQueryData(tasksKey) as ITask[];
      const newTasks = sortTask(preTasks, params);
      queryClient.setQueryData(tasksKey, newTasks);
      return preTasks;
    },
    // onSuccess() {
    //     queryClient.invalidateQueries(tasksKey)
    // },
    onError(err: Error, param: any, preDate: any) {
      queryClient.setQueryData(tasksKey, preDate);
    },
  });
}

function sortTask(tasks: ITask[], params: ISort) {
  tasks = [...tasks];
  const taskIds = tasks.map((item) => item.id);
  const fromIndex = taskIds.indexOf(params.fromId);
  const toIndex = taskIds.indexOf(params.referenceId);
  tasks[fromIndex].kanbanId = Number(params.toKanbanId);
  return moveIitem(tasks, fromIndex, toIndex, params.type);
}
/**
 *
 */
type AfterBefor = "after" | "before";
interface IGetTypeTask {
  arr: any[];
  fromIndex: number;
  toIndex: number;
  fromKanbanId: number;
  toKanbanId: number;
}
export function getTypeTask(param: IGetTypeTask): AfterBefor {
  const { arr, fromKanbanId, fromIndex, toKanbanId, toIndex } = param;
  if (fromKanbanId === toKanbanId) {
    return fromIndex < toIndex ? "after" : "before";
  }
  if (arr[toIndex]) {
    return "before";
  }
  return "after";
}
