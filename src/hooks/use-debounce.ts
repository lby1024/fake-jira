import { useEffect, useRef, useState } from "react";

export const useDebounce = <V>(value: V, delay=250) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    const prev = useRef(value)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            prev.current = value
            clearTimeout(timer)
        }
    }, [value])

    return debouncedValue
}