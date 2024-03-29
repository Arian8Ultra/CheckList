import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginLayout from "../layout/LoginLayout";
import Root from "../layout/Root";
import SignIn from "../pages/Login/SignIn/SignIn";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import { usePersistStore } from "../stores/PersistStore";
import { GET_SHEETS } from "../api/api";
import Questions from "../pages/Questions/Questions";
import Error from "../pages/Error/Error";
import Projects from "../pages/Projects/Project";
import UserManager from "../pages/Admin/UserManager/UserManager";
import Dashboard from "../pages/Admin/dashboard/Dashboard";

const token = sessionStorage.getItem("token");
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route path="login" element={<LoginLayout />}>
        <Route path="" element={<SignIn />} />
      </Route>
      <Route path="home" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="project/:projectId" element={<Projects />} />
        <Route path="questions/:questionId" element={<Questions />} />
        <Route path="admin/users" element={<UserManager />} />
        <Route path="admin/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="admin" element={<MainLayout />}>
      <Route path="users" element={<UserManager />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

export default router;
