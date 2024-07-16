import React from "react";
import { useNavigate } from "react-router-dom";
import { setStatus } from "../store/authSlice";
import { setLoader } from "../store/themeSlice";
import { useDispatch } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import data from "../assets/load.json";

const LoadingBar = () => {
    return (
        <div
        style={{ width: "300px", backgroundColor: "#ddd", borderRadius: "5px" }}
        >
        <motion.div
            style={{
            height: "20px",
            backgroundColor: "#4CAF50",
            borderRadius: "5px",
            }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" , repeat: Infinity}}
        />
        </div>
    );
};


const AnimatedAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const controls = useAnimation();

    setTimeout( () => {
        dispatch(setStatus(true));
        dispatch(setLoader());
        navigate("/home")
    },10000)

    return (
        <div className="bg-gray-800 flex flex-col items-center justify-center h-screen w-screen">
            <Lottie animationData={data} loop={true} className="w-64 mx-auto" />
            <LoadingBar />
        </div>
    );
};

export default AnimatedAuth;
