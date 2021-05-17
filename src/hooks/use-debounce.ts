import { useEffect, useState } from "react";

export function useDebounce<ValueType>(value: ValueType, delay=200 ) {
    const [res, setRes] = useState(value)

    useEffect(() => {
        let timer = setTimeout(() => setRes(value), delay)
        return () => clearTimeout(timer)
    }, [value])

    return res
}