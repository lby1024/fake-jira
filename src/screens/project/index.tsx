import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PEpic from "screens/epic";
import PKanban from "screens/kanban";

const PProject: FC = () => {

    return <div className='' >
        <Routes>
            <Route path='/kanban' element={<PKanban/>} />
            <Route path='/epic' element={<PEpic/>} />
            <Navigate to={window.location.pathname+'/kanban'} replace={true} />
        </Routes>
    </div>
}

export default PProject