import XIdSelect from "components/id-select";
import React, { FC } from "react";
import useUsers from "utils/use-users";

const XUserSelect = (props: React.ComponentProps<typeof XIdSelect>) => {
    const users = useUsers()

    return <XIdSelect options={users.data || []} {...props} />
}

export default XUserSelect