import XAlertProjectForm from 'components/alert-project-form'
import XHeader from 'components/header'
import React, { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import XAlertTaskForm from 'screens/kanban/task-form'
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
        <XAlertProjectForm />
        <XAlertTaskForm />
    </div>
}

export default XRouter
