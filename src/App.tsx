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
import { TreeNodesReports } from "./pages/TreeNodesReports";
import { Navigate } from "react-router-dom";
import { ReportRules } from "./pages/ReportRules";
import { CreateNodesForm } from "./pages/CreateNodesForm";

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={user ? <Root /> : <Navigate to={"/login"}/>}></Route>
        <Route path=":id" element={user ? <TreeNodesReports /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/report/rules/:id" element={user ? <ReportRules/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/submit/nodes/:id" element={user ? <CreateNodesForm/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/register" element={!user ?<Register /> : <Navigate to={"/"}/>}></Route>
        <Route path="/login" element={!user ? <Login /> :<Navigate to={"/"}/>}></Route>
        <Route path="/me" element={user ? <UserProfile /> :<Navigate to={"/"}/>}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
