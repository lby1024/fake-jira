import { Rate } from "antd";
import { FC, useMemo, useState } from "react";

interface IXSaveProject {
    isSave: boolean;
}

const XSaveProject:FC<IXSaveProject> = ({isSave}) => {

    const [save, setSave] = useState(isSave)

    const value = useMemo(() => {
        return save ? 1 : 0
    }, [save])

    function onTap(v: number) {
        console.log(v)
    }

    return <Rate value={value} count={1} onChange={onTap} />
}

export default XSaveProject