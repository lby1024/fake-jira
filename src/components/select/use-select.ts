import { useMemo } from "react";

export function useSelect(options?: {name: string, id: number}[]) {

    const defaultValue = -99

    const newOptions = useMemo(() => {
        const defaultOption = {label: "负责人", value: defaultValue}
        if(!options) return [defaultOption]
        const arr = options?.map(user => ({
            label: user.name,
            value: user.id,
        }))
        return [ defaultOption, ...arr]
    }, [options])

    return {
        options: newOptions,
        defaultValue,
        style: {
            textAlign: "left"
        }
    }
}