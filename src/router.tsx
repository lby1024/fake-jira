import XHeader from 'components/header'
import React, { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PProject from 'screens/project'
import PageProjectList from 'screens/project-list'

const XRouter: FC = () => {

    return <div>
        <XHeader />
        <Routes>
            <Route path='/projects' element={<PageProjectList/>} />
            <Route path='/projects/:id/*' element={<PProject/>} />
            <Navigate to='/projects' />
        </Routes>

    </div>
}

export default XRouter
