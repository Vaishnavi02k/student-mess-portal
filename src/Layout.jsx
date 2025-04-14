import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-800">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
