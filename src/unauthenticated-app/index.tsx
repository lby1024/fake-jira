import React, { FC, useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'

const UnauthenticatedApp: FC = () => {
    const [isRegister, setIsRegister] = useState(false)
    return <div>
        {
            isRegister ? <LoginScreen/> : <RegisterScreen/>
        }
        <div onClick={() => setIsRegister(a => !a)} >
            { isRegister ? '注册' : '登陆' }
        </div>
    </div>
}

export default UnauthenticatedApp