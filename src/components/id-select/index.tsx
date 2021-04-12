import { Select } from "antd";
import React, { FC } from "react";
import { toNumber } from "utils";
import useUsers from "utils/use-users";

type selectProps = React.ComponentProps<typeof Select>

interface IXUserSelect extends Omit<selectProps, 'value' | 'options' | 'onChange'> {
    value?: number | string | null | undefined
    defaultName: string
    onChange?: (v: number) => void
}

const XUserSelect: FC<IXUserSelect> = ({value, defaultName, onChange, ...restProps}) => {
    const users = useUsers()
    const options = users.data || []
    return <Select 
        {...restProps}
        onChange={v => onChange?.(toNumber(v))}
        value={ options.length ? toNumber(value) : 0} >
        {
            defaultName &&
            <Select.Option value={0} >{defaultName}</Select.Option>
        }{
            options.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)
        }
    </Select>
}

export default XUserSelect