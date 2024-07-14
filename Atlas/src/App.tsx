import { UserAuth } from "./context/AuthContext"
import NonUserRoutes from "./routes/NonUserRoutes";
import UserRoutes from "./routes/UserRoutes";


function App() {
  const { isLoggedOut } = UserAuth();

  return <div className="rootbg">{isLoggedOut ? <NonUserRoutes /> : <UserRoutes />} </div>
}

export default App
