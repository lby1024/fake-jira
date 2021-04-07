import { Select } from "antd";
import React, { FC } from "react";
import { toNumber } from "utils";

type selectProps = React.ComponentProps<typeof Select>

interface IXIdSelect extends Omit<selectProps, 'value' | 'options' | 'onChange'> {
    value: number | string | null | undefined
    defaultName: string
    options: {name: string, id: number}[]
    onChange: (v: number) => void
}

const XIdSelect: FC<IXIdSelect> = ({value, defaultName, options, onChange, ...restProps}) => {
    return <Select 
        {...restProps}
        onChange={v => onChange(toNumber(v))}
        value={ options.length ? toNumber(value) : 0} >
        {
            defaultName &&
            <Select.Option value={0} >{defaultName}</Select.Option>
        }{
            options.map(item => <Select.Option value={item.id} >{item.name}</Select.Option>)
        }
    </Select>
}

export default XIdSelect