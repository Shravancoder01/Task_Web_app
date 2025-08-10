import React from 'react';
import './index.css'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from'react-router-dom'
import router from './Router.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
