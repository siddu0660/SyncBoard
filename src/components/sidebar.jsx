import React from "react";
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

function Sidebar({ isDarkMode }) {
  const bgColor = isDarkMode ? "bg-[#3d403d]" : "bg-gray-100";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-800";
  const hoverBgColor = isDarkMode ? "hover:bg-gray-200" : "hover:bg-slate-600";
  const activeBgColor = isDarkMode ? "bg-gray-300" : "bg-slate-600";
  return (
    <div
      className={`${bgColor} ${textColor} p-4 rounded-xl m-8 w-auto flex flex-col justify-between`}
    >
      <div className="w-auto flex flex-col pr-12">
        <div className="flex w-16 h-16 items-center ml-0">
          <img
            className="bg-blend-multiply hover:rotate-[720deg] transition-transform duration-1000"
            src={logo}
            alt="S"
          />
          <h1 className="text-xl font-bold">Dashboard</h1>
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
                `flex items-center p-2 rounded ${hoverBgColor} ${
                  isActive ? activeBgColor : ""
                }`
              }
            >
              <Icon className="mr-2 relative" size={28} />
              <span className="text-lg">{text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div>
        <div className={`items-center p-2 rounded ${hoverBgColor}`}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center p-2 rounded ${hoverBgColor} ${
                isActive ? activeBgColor : ""
              }`
            }
          >
            <HiUser className="mr-2" size={28} />
            <div className="text-left">
              <p>Bob</p>
            </div>
          </NavLink>
        </div>
        <nav className="space-y-2">
          {[
            { to: "/settings", icon: HiCog6Tooth, text: "Settings" },
            { to: "/auth", icon: HiArrowRightOnRectangle, text: "Sign out" },
          ].map(({ to, icon: Icon, text }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${hoverBgColor} ${
                  isActive ? activeBgColor : ""
                }`
              }
            >
              <Icon className="mr-2" size={28} />
              <span>{text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
