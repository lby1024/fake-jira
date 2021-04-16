import { IUserInfo } from "models/user"
import { useQuery } from "react-query"
import { useHttp } from "./http"

function useUsers(params?: Partial<IUserInfo>) {
    const client = useHttp()

    return useQuery<IUserInfo[]>('users', () => client('users') )
}

export default useUsers