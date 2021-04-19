import { Typography } from "antd";
import { FC } from "react";

interface IXErrorBox {
    error: unknown
}

const isError = (value: any): value is Error => value?.message

const XErrorBox: FC<IXErrorBox> = ({ error }) => {
    if(isError(error)) {
        return <Typography.Text type='danger' >{error?.message}</Typography.Text>
    }
    return null
}

export default XErrorBox