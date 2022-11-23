import { useMemo } from "react";

export function useSelect(
  options?: { name: string; id: number }[],
  defaultlabel = "负责人"
) {
  const defaultValue = 0;

  const newOptions = useMemo(() => {
    const defaultOption = { label: defaultlabel, value: defaultValue };
    if (!options) return [defaultOption];
    const arr = options?.map((user) => ({
      label: user.name,
      value: user.id,
    }));
    return [defaultOption, ...arr];
  }, [options]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    options: newOptions,
    defaultValue,
  };
}
