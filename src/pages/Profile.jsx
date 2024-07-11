function Profile({ isDarkMode }) {
  const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
  return (
    <h1 className={`text-center text-xl my-auto  text-[#ffffff] mx-auto ${textColor}`}>
      Profile Work under Progress.......
    </h1>
  );
}
export default Profile;