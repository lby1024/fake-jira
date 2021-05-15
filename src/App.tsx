import React from 'react';
import { useUser } from 'tools/user';
import XUnLogin from './pages/login'

function App() {

  const {data: UserInfo} = useUser()

  return (
    <div className="App">
      {
        UserInfo 
        ? 'projects'
        : <XUnLogin />
      }
    </div>
  );
}

export default App;
