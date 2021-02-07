import { useEffect, useState } from 'react';

/**
 * 是否为 null, undefined, '', 等
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
/**
 * {a: 0, b: null} --> {a: 0}
 */
export const cleanObj = (obj: object) => {
    const res = {...obj}
    Object.keys(res).map(key => {
        // @ts-ignore
        const v = res[key]
        if(isFalsy(v)) {
            // @ts-ignore
            delete res[key]
        }
    })
    return res
}
/**
 * 防抖
 */
export const useDebounce = <V>(value: V, delay=200) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value])

    return debouncedValue
}
/**
 * 生命周期mount
 */
export const useMount = (cb: () => void) => {
    useEffect(() => {
        cb()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}