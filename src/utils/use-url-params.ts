import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

function useUrlParams<K extends string>(keys: K[]) {

    const [getParams, setParams] = useSearchParams()

    const params = useMemo(() => {
        return keys.reduce((pre, key) => ({
            ...pre,
            [key]: getParams.get(key)
        }), {})
    }, [getParams])

    return [
        params,
        setParams
    ] as const
}

export default useUrlParams