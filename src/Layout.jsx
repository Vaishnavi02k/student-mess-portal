
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Content } from 'antd/es/layout/layout'

function Layout() {
  return (
    <>
      <Navbar />
      <Content className="mt-16"> {/* Tailwind margin-top added */}
        <Outlet />
      </Content>
      <Footer />
    </>
  )
}

export default Layout