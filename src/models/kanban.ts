import { useQuery } from "react-query";
import { useHttp } from "utils/http";
import { EQueryKey } from "./query-key";

export interface IKanban {
  id: number;
  name: string;
  projectId: number;
}
 
export function useKanban(params?: IKanban) {
  const client = useHttp()
  const getData = () => {
    return client('kanbans', {data: params})
  }

  return useQuery([EQueryKey.kanbans, params], getData)
}