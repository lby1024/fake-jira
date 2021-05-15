import { useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { API, ILogin, IRegist } from "./api"
import { getToken, localStorageKey, saveToken } from "./localstorage"
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

export const register = async (data: IRegist) => {
    const {user} = await request(API.register, {
        method: 'POST',
        data
    })
    saveToken(user.token)
    return user
}

export const login = async (data: ILogin) => {
    const {user} = await request(API.login, {
        method: 'POST',
        data
    })
    saveToken(user.token)
    return user
}

export const logout = () => {
    window.localStorage.removeItem(localStorageKey.token)
    window.location.reload() // 重新加载页面
}

async function getUserInfo() {
    // 只有获取userInfo时才从localstorage中获取token
    const token = getToken()
    if(!token) return undefined
    const res = await request(API.userInfo, {token})
    return res.user
}

export function useUser() {
    return useQuery<IUser>(queryKey.userInfo, getUserInfo)
}

export function useRegist() {
    const client = useQueryClient()
    return useMutation(register, {
        onSuccess: () => client.invalidateQueries(queryKey.userInfo)
    })
}

export function useLogin() {
    const client = useQueryClient()
    return useMutation(login, {
        onSuccess: () => client.invalidateQueries(queryKey.userInfo)
    })
}
