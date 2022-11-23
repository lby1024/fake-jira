import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObj } from "tools/utils";

export function useUrlParams<K extends string>(keys: K[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return keys.reduce(
      (pre, key) => ({
        ...pre,
        [key]: searchParams.get(key),
      }),
      {} as { [x in K]: string }
    );
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const setParams = (obj: Partial<{ [x in K]: any }>) => {
    let o = cleanObj({
      ...Object.fromEntries(searchParams),
      ...obj,
    }) as URLSearchParamsInit;
    setSearchParams(o);
  };

  return { params, setParams };
}
