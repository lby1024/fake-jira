import { FC } from "react";
import { useEpics } from "./utils";

const XEpic:FC = () => {

    const { data: epics } = useEpics()
    

    return <div>epic</div>
}

export default XEpic