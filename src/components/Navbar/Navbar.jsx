import React, { useEffect, useState } from "react";
import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [userName, setUserName] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("username") || "guest");
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // or use removeItem("username") if only clearing that
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: `/${userName}/dashboard` },
    { name: "Notifications", path: `/${userName}/notifications` },
    { name: "Complaint Box", path: `/${userName}/complaintbox` },
    { name: "Mess Menu", path: `/${userName}/messmenu` },
    { name: "QR Code", path: `/${userName}/qrcode` },
    { name: "Payment", path: `/${userName}/payment` },
  ];

  return (
    <div className="fixed mb-4 top-0 left-0 w-full z-10 bg-green-600 dark:bg-green-800 text-white shadow-md">
      <nav className="mx-auto flex items-center justify-between px-2 py-2 xl:px-4 xl:py-3">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-extrabold text-white ">IIT Goa Mess Portal</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="xl:hidden text-white focus:outline-none"
        >
          <MenuOutlined className="text-2xl" />
        </button>

        {/* Navigation Menu */}
        <ul
          className={`${showMobileMenu ? "block" : "hidden"
            } xl:flex xl:items-center xl:space-x-8 absolute xl:static top-16 left-0 w-full xl:w-auto bg-green-600 dark:bg-green-800 xl:bg-transparent transition-all`}
        >
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="border-t xl:border-none text-center xl:text-left"
            >
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  navigate(link.path);
                }}
                className="w-full xl:w-auto px-4 py-3 xl:px-3 xl:py-2 font-semibold text-lg xl:text-xl text-white hover:bg-green-700 hover:text-green-100 transition-all"
              >
                {link.name}
              </button>
            </li>
          ))}

          {/* Profile Icon - Navigate to /profile */}
          <li className="border-t xl:border-none text-center xl:text-left">
            <button
              onClick={() => {
                setShowMobileMenu(false);
                navigate(`/${userName}/profile`);
              }}
              className="w-full xl:w-auto px-4 py-3 xl:px-3 xl:py-2 font-semibold text-lg xl:text-xl text-white hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <UserOutlined className="text-lg" />
              Profile
            </button>
          </li>

          {/* Logout Button */}
          <li className="border-t xl:border-none text-center xl:text-left">
            <button
              onClick={() => {
                setShowMobileMenu(false);
                handleLogout();
              }}
              className="w-full xl:w-auto px-4 py-3 xl:px-3 xl:py-2 font-semibold text-lg xl:text-xl text-white hover:bg-red-700 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <LogoutOutlined className="text-lg bg-red-700 p-1 rounded-full" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
