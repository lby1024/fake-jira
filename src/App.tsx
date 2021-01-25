import { useUser } from 'context/user-cotext';
import React from 'react';
import UnauthenticatedApp from 'unauthenticated-app';
import AuthenticatedApp from 'authenticated-app';


function App() {
  const {user} = useUser()

  return (
    <div className="App">
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
    </div>
  );
}

export default App;
