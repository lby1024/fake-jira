import XIdSelect from "components/id-select";
import React, { FC } from "react";
import useUsers from "utils/use-users";

interface IXUserSelect extends React.ComponentProps<typeof XIdSelect> {

}

const XUserSelect: FC<IXUserSelect> = (props) => {
    const users = useUsers()

    return <XIdSelect options={users.data || []} {...props} />
}

export default XUserSelect