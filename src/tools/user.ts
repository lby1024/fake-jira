import { useQuery } from "react-query"
import { localStorageKey } from "./localstorage"
import { queryKey } from "./react-query"
import { request } from "./request"

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
    // 只有获取userInfo时才从localstorage中获取token
    const token = window.localStorage.getItem(localStorageKey.token) || undefined
    return request('me', {token})
}

export function useUser() {
    return useQuery<IUser>(queryKey.userInfo, getUserInfo)
}