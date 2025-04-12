import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [userName, setUserName] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("username") || "guest");
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Notifications", path: "/notifications" },
    { name: "ComplaintBox", path: `/complaintbox` },
    { name: "MessMenu", path: "/messmenu" },
    { name: "QrCode", path: `/qrcode` },
    { name: "Payment", path: `/${userName}/payment` },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-green-600 dark:bg-green-800 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 xl:px-6 xl:py-4">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl font-extrabold text-white">IIT MESS</span>
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
          className={`${
            showMobileMenu ? "block" : "hidden"
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
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
