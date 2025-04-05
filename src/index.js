import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './components/Dashboard/Dashboard';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Notifications from './components/Notifications/Notifications';
import MessMenu from './components/MessMenu/MessMenu';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<Dashboard />} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/notifications' element={<Notifications/>}/>
      <Route path='/messmenu' element={<MessMenu/>}/>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

