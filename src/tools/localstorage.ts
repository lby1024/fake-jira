export enum localStorageKey {
    token = 'token'
}

export function getToken() {
    return window.localStorage.getItem(localStorageKey.token)
}

export function saveToken(token: string) {
    window.localStorage.setItem(localStorageKey.token, token || '')
}
