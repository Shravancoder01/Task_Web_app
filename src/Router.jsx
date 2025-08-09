import { createBrowserRouter } from "react-router-dom";
import Hero from "./components/hero/Hero.jsx";
import Signin from "./components/register/Signin";
import Signup from "./components/register/SignUp.jsx";
import Playground from "./components/pages/Plaground.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import PageNotFound from "./components/pages/PageNotFound.jsx";
import Layout from "./components/hero/Layout.jsx";

export const router = createBrowserRouter([    
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: true, element: <Hero /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "playground", element: <Playground /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <PageNotFound /> },     
    ],
  },
]);

export default router;
