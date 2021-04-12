import { IUserInfo } from "models/user"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { cleanObj } from "utils"
import { useHttp } from "./http"
import useAsync from "./use-async"

function useUsers(params?: Partial<IUserInfo>) {
    const client = useHttp()

    // useEffect(() => {
    //     run(client('users', {data: cleanObj(params || {})}))
    // }, [params])

    return useQuery<IUserInfo[]>('users', () => client('users') )
}

export default useUsers