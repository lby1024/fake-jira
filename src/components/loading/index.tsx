import styled from "@emotion/styled";
import { Spin } from "antd";
import { FC } from "react";

interface IXLoading {
    className?: string;
}

const XLoading: FC<IXLoading> = ({className}) => {
    return <Content className={className} >
        <Spin size="large" />
    </Content>
}

export default XLoading

const Content = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`