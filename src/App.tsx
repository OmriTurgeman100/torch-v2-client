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
import { CreateNodesForm } from "./pages/CreateNodesFormRoot";
import { CreateNodesTreeForm } from "./pages/CreateNodesTreeForm";
import { ReportsMenu } from "./pages/ReportsMenu";
import { Create_Node_Rules } from "./pages/Create_Node_Rules";
import { Create_Report_Rules } from "./pages/Create_Report_Rules";
import { Display_Node_Rules } from "./pages/Display_Node_Rules";
import { Display_Report_Rules } from "./pages/Display_Report_Rules";

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={user ? <Root /> : <Navigate to={"/login"}/>}></Route>
        <Route path=":id" element={user ? <TreeNodesReports /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/report/rules/:id" element={user ? <ReportRules/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/submit/nodes/root" element={user ? <CreateNodesForm/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/submit/nodes/tree/:id" element={user ? <CreateNodesTreeForm/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/reports/menu/tree/:id" element={user ? <ReportsMenu/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/submit/node/rules/:id" element={user ? <Create_Node_Rules /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/display/node/rules/:id" element={user ? <Display_Node_Rules /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/display/report/rules/:id/:report_id" element={user ? <Display_Report_Rules /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/submit/report/rules/:id/:report_id" element={user ? <Create_Report_Rules /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/register" element={!user ?<Register /> : <Navigate to={"/"}/>}></Route>
        <Route path="/login" element={!user ? <Login /> :<Navigate to={"/"}/>}></Route>
        <Route path="/me" element={user ? <UserProfile /> :<Navigate to={"/"}/>}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
