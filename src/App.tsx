import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Root } from "./pages/Root";
import { UserProfile } from "./pages/UserProfile";
import { useAuthContext } from "./Context/UseAuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext();

  console.log(user)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={user ? <Root /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/register" element={!user ?<Register /> : <Navigate to={"/"}/>}></Route>
        <Route path="/login" element={!user ? <Login /> :<Navigate to={"/"}/>}></Route>
        <Route path="/me" element={user ? <UserProfile /> :<Navigate to={"/"}/>}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
