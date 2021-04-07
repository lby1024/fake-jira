import { Rate } from "antd";
import React, { FC } from "react";

interface IXCollection extends React.ComponentProps<typeof Rate> {
    checked: boolean
    onCheckedChange?: (checked: boolean) => void
}

const XCollection: FC<IXCollection> = ({checked, onCheckedChange, ...rest}) => {
    return <Rate 
        onChange={num => onCheckedChange?.(!!num)}
        count={1} 
        value={checked ? 1 : 0}
        {...rest}
    />
}

export default XCollection