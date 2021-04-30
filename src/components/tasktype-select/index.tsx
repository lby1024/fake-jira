import XIdSelect from "components/id-select";
import { useTaskTypes } from "models/task";
import React, { FC } from "react";

interface IXTaskTypeSelect extends React.ComponentProps<typeof XIdSelect> {

}
const XTaskTypeSelect: FC<IXTaskTypeSelect> = (props) => {
    const taskTypes = useTaskTypes()
    
    return <XIdSelect options={taskTypes.data || []} {...props} />
}

export default XTaskTypeSelect