import { Select } from "antd";
import React, { FC } from "react";
import { toNumber } from "utils";
import useUsers from "utils/use-users";

type selectProps = React.ComponentProps<typeof Select>

interface IXUserSelect extends Omit<selectProps, 'value' | 'options' | 'onChange'> {
    value?: number | string | null | undefined
    defaultName: string
    onChange?: (v: number) => void
    options?: {name: string, id: number}[]
}

const XIdSelect: FC<IXUserSelect> = ({value, defaultName, options, onChange, ...restProps}) => {
    return <Select 
        {...restProps}
        onChange={v => onChange?.(toNumber(v))}
        value={ options?.length ? toNumber(value) : 0} >
        {
            defaultName &&
            <Select.Option value={0} >{defaultName}</Select.Option>
        }{
            options?.map(item => <Select.Option key={item.id} value={item.id} >{item.name}</Select.Option>)
        }
    </Select>
}

export default XIdSelect