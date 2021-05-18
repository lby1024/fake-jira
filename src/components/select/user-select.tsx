import styled from "@emotion/styled";
import { Select } from "antd";
import { FC, useMemo } from "react";
import { useUsers } from "tools/user";
import { useSelect } from "./use-select";

interface IXUserSelect extends React.ComponentProps<typeof Select> {
    
}

const XUserSelect:FC<IXUserSelect> = (props) => {
    const {data: users} = useUsers()

    const {options, defaultValue} = useSelect(users)

    return <Content 
        {...props}
        value={props.value || defaultValue}
        options={options} 
    />
}

export default XUserSelect

const Content = styled(Select)`
    .ant-select-selection-item {
        text-align: left;
    }
`