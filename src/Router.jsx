import { createBrowserRouter } from "react-router-dom";
import Hero from "./components/hero/Hero.jsx";
import Signin from "./components/register/Signin.jsx";
import Signup from "./components/register/SignUp.jsx";
import Playground from "./components/pages/Playground.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import PageNotFound from "./components/pages/PageNotFound.jsx";
import Layout from "./components/hero/Layout.jsx";
import FocusPage from "./components/pages/FocusPage.jsx";
import NotesPage from "./components/pages/NotesPage.jsx";

// 🔹 Import your new Calendar page
import CalendarPage from "./components/pages/CalendarPage.jsx";

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
      { path: "calendar", element: <CalendarPage /> }, 
      { path: "focus", element: <FocusPage /> },
      { path: "notes", element: <NotesPage /> }, 
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default router;
