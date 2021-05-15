import { logout, useUser } from 'tools/user';
import XUnLogin from './pages/login'

function App() {

  const {data: userInfo, isLoading} = useUser()

  return (
    <div className="App">
      {
        userInfo 
        ? <div onClick={logout} >{`asdfasdf${JSON.stringify(userInfo)}`}</div>
        : isLoading
        ? <div>loading...</div>
        : <XUnLogin />
      }
    </div>
  );
}

export default App;
