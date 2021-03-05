import XHeader from 'components/header'
import React, { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PProject from 'screens/project'
import PageProjectList from 'screens/project-list'

const AuthenticatedApp: FC = () => {

    return <div>
        <XHeader />
        <BrowserRouter>
            <Routes>
                <Route path='/projects' element={<PageProjectList/>} />
                <Route path='/projects/:projectId/*' element={<PProject/>} />
                <Navigate to='/projects' />
            </Routes>
        </BrowserRouter>

    </div>
}

export default AuthenticatedApp
