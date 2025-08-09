import { createBrowserRouter } from "react-router-dom";
import Hero from "./components/hero/Hero.jsx";
import Signin from "./components/register/Signin.jsx";
import Signup from "./components/register/SignUp.jsx";
import Playground from "./components/pages/Playground.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import PageNotFound from "./components/pages/PageNotFound.jsx";
import Navbar from "./components/hero/Navbar.jsx";
import Layout from "./components/hero/Layout.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Hero /> }, // home route
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "playground", element: <Playground /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default router;
