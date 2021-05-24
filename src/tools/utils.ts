/**
 * 是否为 null, undefined, "", 等
 */
 export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
 /**
  * {a: 0, b: null} --> {a: 0}
  */
 export const cleanObj = (obj?: {[key: string]: unknown}) => {
     if(!obj) {
         return {};
     }
     const res = {...obj}
     Object.keys(res).forEach(key => {
         const v = res[key]
         if(isFalsy(v)) {
             delete res[key]
         }
     })
     return res
 }

 export function debounce(callback: (data?: any) => void, delay=100) {
    let timer: any = null
     return function fn(...args: any[]) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            callback(args)
        }, delay);
     }
 }