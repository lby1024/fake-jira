import XLoading from "components/loading";
import XProjectsRouter from "router/projects-router";
import { useUser } from "tools/user";
import XUnLogin from "./pages/login";

function App() {
  const { data: userInfo, isLoading } = useUser();

  return (
    <div>
      {userInfo ? <XProjectsRouter /> : isLoading ? <XLoading /> : <XUnLogin />}
    </div>
  );
}

export default App;
