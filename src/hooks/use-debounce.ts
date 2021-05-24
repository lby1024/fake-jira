import { useEffect, useState } from "react";

export const useDebounce = <V>(value: V, delay=1000) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
            console.log(+new Date(), value, '----- xxx');
            
        }, delay)
        return () => clearTimeout(timer)
    }, [value])

    return debouncedValue
}