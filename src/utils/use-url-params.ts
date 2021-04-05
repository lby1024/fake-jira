import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObj } from "utils"

function useUrlParams<K extends string>(keys: K[]) {
        
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useMemo(() => {
        return keys.reduce((pre, key) => ({
            ...pre,
            [key]: searchParams.get(key)
        }), {} as {[x in K]: string})
    }, [searchParams])

    const setParams = (obj: Partial<{[x in K]: any}>) => {
        let o = cleanObj({
            ...Object.fromEntries(searchParams),
            ...obj,
        }) as URLSearchParamsInit
        setSearchParams(o)
    }

    return [
        params,
        setParams
    ] as const
}

export default useUrlParams