import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import PEpic from "screens/epic";
import PKanban from "screens/kanban";

const PProject: FC = () => {
    
    return <div className='' >
        left-rihgt
        <Routes>
            <Route path='/kanban' element={<PKanban/>} />
            <Route path='/epic' element={<PEpic/>} />
        </Routes>
    </div>
}

export default PProject