function Home({isDarkMode}) {
  const textColor = isDarkMode ? "text-gray-800" : "text-gray-100";
  return (
    <h1 className={`text-center text-2xl my-auto text-[#ffffff] mx-auto ${textColor}`}>
      Welcome Home.......
    </h1>
  );
}

export default Home;