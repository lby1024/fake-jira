import { Button, Card, Divider, Typography } from 'antd'
import React, { FC, useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { useTitle } from 'utils'

const UnauthenticatedApp: FC = () => {
    useTitle('登录注册')
    const [isRegister, setIsRegister] = useState(true)
    const [err, setErr] = useState<Error | null>(null)
    return (
        <Container>
            <Header />
            <Background />
            <CardCss>
                <Title>{isRegister ? "请登录" : "请注册"}</Title>
                { 
                  err && 
                  <Typography.Text type='danger' >{err.message}</Typography.Text> 
                }{ 
                  isRegister 
                  ? <LoginScreen onError={setErr} /> 
                  : <RegisterScreen onError={setErr} /> 
                }
                <Divider />
                <div onClick={() => setIsRegister(a => !a)} >
                    { isRegister ? '去注册' : '直接登陆' }
                </div>
            </CardCss>
        </Container>
    )
}

export default UnauthenticatedApp

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`
const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`
const CardCss = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
