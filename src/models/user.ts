import { localStorageKey } from "./localstorage"

export const login = () => {

}

export const logout = () => {
    window.localStorage.removeItem(localStorageKey.token)
    window.location.reload() // 重新加载页面
}