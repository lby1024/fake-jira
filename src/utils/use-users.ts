import { IUserInfo } from "models/user"
import { useQuery } from "react-query"
import { useHttp } from "./http"

function useUsers() {
    const client = useHttp()
    const getData = () => client('users')
    return useQuery<IUserInfo[]>('users', getData )
}

export default useUsers