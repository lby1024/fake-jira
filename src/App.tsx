import XLoading from 'components/loading';
import { useEffect, useState } from 'react';
import XProjectsRouter from 'router/projects-router';
import { logout, useUser } from 'tools/user';
import XUnLogin from './pages/login'

function App() {

  const {data: userInfo, isLoading} = useUser()

  return (
    <div className="App">
      {
        userInfo 
        ? <XProjectsRouter />
        : isLoading
        ? <XLoading />
        : <XUnLogin />
      }
    </div>
  );
}

export default App;
