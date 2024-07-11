function Settings({ isDarkMode }) {
  const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
  return (
    <h1 className={`text-center text-xl text-[#ffffff] my-auto mx-auto ${textColor}`}>
      Settings Work under Progress......
    </h1>
  );
}
export default Settings;