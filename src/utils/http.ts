import User from 'models/user';
import * as qs from 'qs'
import { useUser } from 'context/user-cotext';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string
    data?: object
    method?: 'GET'|'POST'|'PUT'|'PATCH'
}

export const http = async (api: string, cfg: Config = {} ) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: cfg.token ? `Bearer ${cfg.token}` : ``,
            'Content-Type': cfg.data ? 'application/json' : '',
        },
        ...cfg
    }

    if(config.method.toUpperCase() === 'GET') {
        api += `?${qs.stringify(cfg.data)}`
    }else {
        config.body = JSON.stringify(cfg.data || {})
    }

    const res = await window.fetch(`${apiUrl}/${api}`, config)
    if(res.status === 401) {
        await User.logout()
        window.location.reload()
        return Promise.reject({message: '请重新登陆'})
    }
    const data = await res.json()
    if(res.ok) {
        return data
    } else {
        return Promise.reject(data)
    }
}

export const useHttp = () => {
    const { user } = useUser()
    return (...[api, config]: Parameters<typeof http>) => 
        http(api, {...config, token: user?.token})
}
