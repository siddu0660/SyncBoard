  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import ModeToggle from "../components/themeButton";
  import { auth, provider } from "../components/firebase";
  import { signInWithPopup } from "firebase/auth";
  import DarkLogo from "../assets/Dark_logo-removebg-preview.png"
  import LightLogo from "../assets/Light_Logo-removebg-preview.png";
  import Line from "../assets/line.png";
  import LineWhite from "../assets/Line_White.png";

  function Login({setStatus}) {
    const [showSignIn , setShowSignIn] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const isDark = document.body.classList.contains("dark");
      setIsDarkMode(isDark);
    }, []);

    const toggleDarkMode = () => {
      if (isDarkMode) {
        document.body.classList.add("transition-delay");
        document.body.classList.remove("dark");
        document.body.classList.remove("transition-delay");
        setIsDarkMode(false);
      } else {
        setIsDarkMode(true);
        document.body.classList.add("dark");
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        localStorage.setItem("email", email);
        setStatus(true);
        navigate("/");
      }
    };

    function handleClick() {
      signInWithPopup(auth, provider).then((data) => {
        setEmail(data.user.email);
        localStorage.setItem("email", data.user.email);
        console.log(data.user.email);
        setStatus(true);
        navigate("/");
      });
    }

    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen 
        transition-colors duration-300 ease-in-out
        ${
          isDarkMode
            ? "bg-[url('./assets/Dark_BG.png')]"
            : "bg-[url('./assets/Light_BG.png')]"
        }`}
      >
        <div className="absolute top-4 right-4">
          <ModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        <img
          src={`${isDarkMode ? DarkLogo : LightLogo}`}
          alt="Logo"
          className="w-96 h-96 mx-auto bg-blend-multiply"
        />
        <form
          onSubmit={handleSubmit}
          id="signIn"
          className="flex flex-col space-y-4 "
        >
          <label className="relative flex-1 group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 pt-6 pb-2 outline-none border rounded-lg text-base
            transition-colors duration-300 ease-in-out
            ${
              !isDarkMode
                ? "bg-[#333] text-white border-[rgba(105,105,105,0.397)]"
                : "bg-white text-black border-gray-300"
            }
            focus:border-[#00bfff] focus:border-2 focus:ring-2`}
              placeholder=" "
            />
            <span
              className={`absolute left-4 top-1 transition-colors duration-300 ease-in-out
            ${
              !isDarkMode ? "text-[rgba(255,255,255,0.5)]" : "text-gray-500"
            }`}
            >
              Email
            </span>
          </label>
          <label className="relative flex-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 pt-6 pb-2 outline-none border rounded-lg text-base
            transition-colors duration-300 ease-in-out
            ${
              !isDarkMode
                ? "bg-[#333] text-white border-[rgba(105,105,105,0.397)]"
                : "bg-white text-black border-gray-300"
            }
            focus:border-[#00bfff] focus:border-2 focus:ring-2`}
              placeholder=" "
            />
            <span
              className={`absolute left-4 top-1 transition-colors duration-300 ease-in-out
            ${
              !isDarkMode ? "text-[rgba(255,255,255,0.5)]" : "text-gray-500"
            }`}
            >
              Password
            </span>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2
            transition-colors duration-300 ease-in-out
            ${!isDarkMode ? "text-[#00bfff]" : "text-gray-500"}`}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>
          <button
            type="submit"
            className="bg-[#00bfff] text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out hover:bg-[#0095cc]"
          >
            Login
          </button>
        </form>
        <div className="hr w-80 mt-4">
          <img
            src={`${isDarkMode ? LineWhite : Line}`}
            alt="Line"
            className="w-full bg-blend-multiply dark:bg-invert"
          />
        </div>
        <button
          className={`flex items-center mt-4 px-4 py-2 font-semibold border rounded shadow-md
          transition-colors duration-300 ease-in-out
          ${
            !isDarkMode
              ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    );
  }

  export default Login;
