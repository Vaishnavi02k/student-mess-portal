import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '.';
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
import PaymentSuccess from './components/Payment/PaymentSucess';
import PaymentCancel from './components/Payment/PaymentCancel';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './components/Profile/Profile';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* No layout for login/signup */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes only use Layout */}
      <Route path="/:username" element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messmenu" element={<MessMenu />} />
          <Route path="payment" element={<Payment />} />
          <Route path="complaintbox" element={<ComplaintBox />} />
          <Route path="qrcode" element={<QRCodeGenerator />} />
          <Route path="success" element={<PaymentSuccess />} />
          <Route path="cancel" element={<PaymentCancel />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Route>
    </>
  )
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  </React.StrictMode>
);

