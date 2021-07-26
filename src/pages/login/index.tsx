import styled from "@emotion/styled";
import { Card, Divider, Typography } from "antd";
import { FC, useMemo, useState } from "react";
import XLogin from "./login";
import logo from "assets/logo.svg"
import left from "assets/left.svg"
import right from "assets/right.svg"
import XRegist from "./regist";

const PUnlogin:FC = () => {
    const [isRegist, setIsRegist] = useState(false)
    const [error, setError] = useState<Error>()

    const footerInfo = useMemo(() => {
        return isRegist ? "已经有账号了?直接登录" : "没有账号?注册新账号"
    }, [isRegist])

    const title = useMemo(() => {
        return isRegist ? "注册" : "登录"
    }, [isRegist])

    return <Content>
        <div className="header" />
        <div className="bg" />
        <Card className='card' >
            {
                <h2 className="title" >{title}</h2>
            }{
                error &&
                <Typography.Text type="danger" >{error.message}</Typography.Text>
            }{
                isRegist
                ? <XRegist onError={setError} />
                : <XLogin onError={setError} />
            }
            <Divider />
            <a onClick={() => setIsRegist(!isRegist)} >
                {footerInfo}
            </a>
        </Card>
    </Content>
}
export default PUnlogin

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    .header {
        background: url(${logo}) no-repeat center;
        padding: 5rem 0;
        background-size: 8rem;
        width: 100%;
    }
    .card {
        width: 40rem;
        min-height: 56rem;
        padding: 3.2rem 4rem;
        border-radius: 0.3rem;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
        text-align: center;
    }
    .bg {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-image: url(${left}), url(${right});
        background-position: left bottom, right bottom;
        background-size: calc((100vw/2) - 21rem);
    }
    .title {
        margin-bottom: 2.4rem;
        color: rgb(94, 108, 132);
    }
`