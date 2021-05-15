import { useQuery } from "react-query"
import { API } from "./api"
import { getToken, localStorageKey } from "./localstorage"
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
/**
 * 登录注册
 */
export interface IUserForm {
    username: string,
    password: string
}

export const register = async (data: IUserForm) => {
    const res = await request(API.register, {
        method: 'POST',
        data
    })
}

export const login = async (data: IUserForm) => {
    const res = await request(API.login, {
        method: 'POST',
        data
    })

}

export const logout = () => {
    window.localStorage.removeItem(localStorageKey.token)
    window.location.reload() // 重新加载页面
}

async function getUserInfo() {
    // 只有获取userInfo时才从localstorage中获取token
    const token = getToken()
    if(token) return await request(API.userInfo, {token})
    return undefined
}

export function useUser() {
    return useQuery<IUser>(queryKey.userInfo, getUserInfo)
}
