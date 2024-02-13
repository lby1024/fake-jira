import { QueryKey, useQueryClient } from "react-query";

type fnUpdate = (list: any[], item: any) => any[];

function useQueryConfig(key: QueryKey, update: fnUpdate) {
  const queryClient = useQueryClient();
  return {
    async onMutate(param: any) {
      const preData = queryClient.getQueryData(key) as any[];
      const newData = update(preData, param);
      queryClient.setQueryData(key, newData);
      return preData;
    },
    onSuccess() {
      queryClient.invalidateQueries(key);
    },
    onError(err: Error, param: any, preDate: any) {
      queryClient.setQueryData(key, preDate);
    },
  };
}

export function useEditConfig(key: QueryKey) {
  return useQueryConfig(key, editList);
}

export function useAddConfig(key: QueryKey) {
  return useQueryConfig(key, addList);
}

export function useDeleteConfig(key: QueryKey) {
  return useQueryConfig(key, deleteList);
}

function editList(list: any[], newItem: any) {
  list = list.map((item) => {
    if (item.id === newItem.id)
      return {
        ...item,
        ...newItem,
      };
    return item;
  });

  return [...list];
}

function addList(list: any[], item: any) {
  list = list || [];
  const newItem = { ...item };
  newItem.id = newItem.id || +new Date();

  return [...list, newItem];
}

function deleteList(list: any[], target: any) {
  list = list.filter((item) => item.id !== target.id);

  return [...list];
}
