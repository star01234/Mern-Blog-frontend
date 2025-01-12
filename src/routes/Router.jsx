import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import PostDetail from "../pages/PostDetail";
import Create from "../pages/Create";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../component/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "create", element: <Create /> },
      { path: "post/:id", element: <PostDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
export default router;
