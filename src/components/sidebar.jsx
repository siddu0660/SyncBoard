import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-removebg-preview.png";
import "../index.css";
import {
  HiHome,
  HiChatBubbleLeftRight,
  HiSquares2X2,
  HiClipboardDocumentList,
  HiPuzzlePiece,
  HiUserGroup,
  HiUser,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";

function Sidebar({ isDarkMode , setStatus }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleClick() {
    setStatus(false);
  }

  useEffect(() => {
    document.body.style.transition = "none";
    document.body.offsetHeight;
    document.body.style.transition = "";
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  function handleLogout() {
    setStatus(false);
    console.log("Logout");
  }
  return (
    <div
      className={`transition-all duration-300 ease-in-out p-4 rounded-xl m-8 ${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col justify-between overflow-hidden
      ${
        isDarkMode
          ? "bg-white/[0.8] text-gray-800"
          : "bg-[#3d403d] text-[#F5F0E8]"
      }`}
    >
      <div className="flex flex-col">
        <div
          className="flex items-center cursor-pointer mb-6"
          onClick={toggleSidebar}
        >
          <img
            className="w-12 h-12 bg-blend-multiply hover:rotate-[720deg] transition-transform duration-1000"
            src={logo}
            alt="S"
          />
          <h1
            className={`text-xl font-bold ml-2 whitespace-nowrap ${
              isExpanded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            Dashboard
          </h1>
        </div>
        <nav className="space-y-2">
          {[
            { to: "/", icon: HiHome, text: "Home" },
            { to: "/chat", icon: HiChatBubbleLeftRight, text: "Chat" },
            { to: "/whiteboard", icon: HiSquares2X2, text: "Whiteboard" },
            {
              to: "/objectives",
              icon: HiClipboardDocumentList,
              text: "Objectives",
            },
            { to: "/games", icon: HiPuzzlePiece, text: "Games" },
            { to: "/rooms", icon: HiUserGroup, text: "Rooms" },
          ].map(({ to, icon: Icon, text }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center py-2 px-2 rounded transition-colors duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "bg-gray-400"
                      : "bg-[#D2A76A]/[0.8]"
                    : isDarkMode
                    ? "hover:bg-gray-400"
                    : "hover:bg-[#D2A76A]/[0.8]"
                }`
              }
            >
              <Icon className="w-7 h-7 flex-shrink-0" />
              <span
                className={`ml-2 whitespace-nowrap ${
                  isExpanded ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              >
                {text}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div>
        <nav className="space-y-2">
          {[
            { to: "/profile", icon: HiUser, text: "Profile" },
            { to: "/settings", icon: HiCog6Tooth, text: "Settings" },
            { to: "/auth", icon: HiArrowRightOnRectangle, text: "Sign out", onClick: handleLogout }
          ].map(({ to, icon: Icon, text , onClick}) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClick}
              className={({ isActive }) =>
                `flex items-center p-2 rounded transition-colors duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "bg-gray-400"
                      : "bg-[#D2A76A]/[0.8]"
                    : isDarkMode
                    ? "hover:bg-gray-400"
                    : "hover:bg-[#D2A76A]/[0.8]"
                }`
              }
            >
              <Icon className="w-7 h-7 flex-shrink-0" />
              <span
                className={`ml-2 whitespace-nowrap ${
                  isExpanded ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              >
                {text}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
