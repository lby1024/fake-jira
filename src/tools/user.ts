import { useQuery } from "react-query"
import { getToken, localStorageKey } from "./localstorage"
import { queryKey } from "./react-query"
import { request, useHttp } from "./request"

export interface IUser {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

export const login = () => {

}

export const logout = () => {
    window.localStorage.removeItem(localStorageKey.token)
    window.location.reload() // 重新加载页面
}

function getUserInfo() {
    const token = getToken()
    return request('me', {token})
}

export function useUser() {
    return useQuery<IUser>(queryKey.userInfo, getUserInfo)
}