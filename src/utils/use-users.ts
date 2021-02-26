import { IUserInfo } from "models/user"
import { useEffect } from "react"
import { cleanObj } from "utils"
import { useHttp } from "./http"
import useAsync from "./use-async"

function useUsers(params?: Partial<IUserInfo>) {
    const client = useHttp()
    const { run, ...res } = useAsync<IUserInfo[]>()

    useEffect(() => {
        run(client('users', {data: cleanObj(params || {})}))
    }, [params])

    return res
}

export default useUsers