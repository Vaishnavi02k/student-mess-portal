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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/Payment/Payment';
import ComplaintBox from './components/ComplaintBox/ComplaintBox';
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<Dashboard />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path='/messmenu' element={<MessMenu />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/complaintbox" element={<ComplaintBox />} />
      <Route path="/qrcode" element={<QRCodeGenerator />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  </React.StrictMode>
);

