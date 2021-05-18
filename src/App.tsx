import { useUser } from 'context/user-cotext';
import XLogout from 'logout';
import XRouter from 'router';

function App() {
  const {user} = useUser()

  return (
    <div className="App">
      { user ? <XRouter /> : <XLogout /> }
    </div>
  );
}

export default App;
