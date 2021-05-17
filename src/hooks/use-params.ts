import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { cleanObj } from "tools/utils"

export function useUrlParams<KEY extends string>(keys: KEY[]) {
    const [searchParams, setSearchParams] = useSearchParams()
    type paramType = {[x in KEY]: string}
    type InputParam = {[x in KEY]: any}

    const params = useMemo(() => {
        return keys.reduce((p, key) => {
            const value = searchParams.get(key)
            if(value) p[key] = value
            return p
        }, {} as paramType)
    }, [keys, searchParams])

    const setParams = (p: InputParam) => {
        const o = cleanObj({
            ...params,
            ...p
        }) as paramType
        setSearchParams(o)
    }

    return {params, setParams}
}