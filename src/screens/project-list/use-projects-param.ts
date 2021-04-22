import { useMemo } from "react"
import { cleanObj } from "utils"
import useUrlParams from "utils/use-url-params"

export default function useProjectsParam() {
    const [param, setParams] = useUrlParams(['name', 'personId'])

    const p = useMemo(() => {
        return {
            ...param,
            personId: Number(param.personId) || undefined
        }
    }, [param])

    return {
        param: p,
        setParams
    }
}