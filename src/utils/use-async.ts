import { useState } from "react"

interface State<D> {
    error: Error | null;
    data: D | null;
    state: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitData: State<null> = {
    error: null,
    data: null,
    state: 'idle',
}

function useAsync<D>(initData: State<D>) {
    const [state, setState] = useState({
        ...defaultInitData,
        ...initData
    })

    const setData = (data: D) => {
        setState({
            error: null,
            data,
            state: 'success'
        })
    }

    const setErr = (err: Error) => {
        setState({
            error: err,
            data: null,
            state: 'error'
        })
    }

    const run = async (promise: Promise<D>) => {
        if(!promise || !promise.then){
            throw new Error('请传入 promise 类型数据')
        }
        setState({...state, state: 'loading'})
        try {
            const data = await promise
            setData(data)
            return data
        } catch (error) {
            setErr(error)
            return error
        }
    }

    return {
        run,
        setData,
        setErr,
        ...state,
        isIdle: state.state === 'idle',
        isLoading: state.state === 'loading',
        isError: state.state === 'error',
        isSuccess: state.state === 'success',
    }
}

export default useAsync