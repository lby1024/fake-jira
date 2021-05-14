export enum localStorageKey {
    token = 'token'
}

export function getToken() {
    return window.localStorage.getItem(localStorageKey.token) || undefined
}