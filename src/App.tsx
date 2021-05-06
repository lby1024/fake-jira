import { useUser } from 'context/user-cotext';
import React from 'react';
import XLogout from 'logout';
import XRouter from 'router';
import XAlertProjectForm from 'components/alert-project-form';
import XAlertTaskForm from 'screens/kanban/task-form';

function App() {
  const {user} = useUser()

  return (
    <div className="App">
      { user ? <XRouter /> : <XLogout /> }
      <XAlertProjectForm />
      <XAlertTaskForm />
    </div>
  );
}

export default App;
