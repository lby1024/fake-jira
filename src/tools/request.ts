import * as qs from 'qs'
import { useQueryClient } from 'react-query';
import { queryKey } from './react-query';
import { IUser, logout } from './user';

const apiUrl = process.env.REACT_APP_API_URL;

interface IConfig extends RequestInit {
    token?: string
    data?: object
    method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'
}

export async function request(api: string, cfg: IConfig = {} ) {
    const config = getConfig(cfg)

    if(config.method.toUpperCase() === 'GET') {
        const params = qs.stringify(cfg.data)
        if(params) api += `?${params}`
    }else {
        config.body = JSON.stringify(cfg.data || {})
    }

    const res = await window.fetch(`${apiUrl}/${api}`, config)
    return await resolveRes(res)
}
/**
 * req 的 config
 */
function getConfig(cfg: IConfig) {
    return {
        method: 'GET',
        headers: {
            Authorization: cfg.token ? `Bearer ${cfg.token}` : ``,
            'Content-Type': cfg.data ? 'application/json' : '',
        },
        ...cfg
    }
}
/**
 * 处理response
 */
async function resolveRes(res: Response) {
    if(res.status === 401) {
        logout()
        return Promise.reject({message: '请重新登陆'})
    }
    const data = await res.json()
    if(res.ok) {
        return data
    } else {
        return Promise.reject(data)
    }
}
/**
 * 登录, 注册, 获取用户信息, 不使用
 */
export function useHttp() {
    const queryClient = useQueryClient()
    const userInfo = queryClient.getQueryData<IUser>(queryKey.userInfo)

    return (api:string, cfg?: IConfig) => request(api, {
        ...cfg,
        token: userInfo?.token
    })
}