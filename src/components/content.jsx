import React from "react";

const Content = ({ children, isDarkMode }) => {
  const bgColor = isDarkMode ? "bg-white/[0.8]" : "bg-[#3d403d]";
  const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
  const borderColor = isDarkMode ? "border-black" : "border-[#D2A76A]";
  return (
    <div
      className={`flex-grow p-4 my-8 mr-8 rounded-l-xl rounded-b-xl rounded-tr-[120px] shadow-lg ${bgColor} ${textColor}`}
    >
      <div
        className={`flex flex-col h-full w-full ${borderColor} border-4 rounded-b-xl rounded-l-xl rounded-tr-[122px]`}
      >
        <div
          className={`flex flex-col h-full w-full rounded-b-lg rounded-l-lg rounded-tr-[120px] ${bgColor} ${textColor}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Content;
