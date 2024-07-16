import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedText = ({ onComplete }) => {
    const [text, setText] = useState("");
    const controls = useAnimation();

    useEffect(() => {
        const animateText = async () => {
        await controls.start({ opacity: 1, y: 0 });

        const initialText = "Welcome to World of ";
        for (let i = 0; i < initialText.length; i++) {
            setText((prevText) => prevText + initialText[i]);
            await new Promise((resolve) => setTimeout(resolve, 50));
        }

        const workText = "Work";
        for (let i = 0; i < workText.length; i++) {
            setText((prevText) => prevText + workText[i]);
            await new Promise((resolve) => setTimeout(resolve, 50));
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        for (let i = 0; i < workText.length; i++) {
            setText((prevText) => prevText.slice(0, -1));
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        const syncText = "Sync";
        for (let i = 0; i < syncText.length; i++) {
            setText((prevText) => prevText + syncText[i]);
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        await new Promise((resolve) => setTimeout(resolve, 500)); 
        const finalText = initialText + syncText;
        for (let i = 0; i < finalText.length; i++) {
            setText((prevText) => prevText.slice(0, -1));
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        controls.start({ opacity: 0 });
        onComplete();
        };
        animateText();
    }, [controls]);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-black via-gray-950 to-black">
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={controls}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white text-center"
            style={{
                    textShadow: "5px 5px 5px rgba(255, 255, 255, 0.5)",
                }}
        >
            {text}
            <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
            |
            </motion.span>
        </motion.h1>
        </div>
    );
};

export default AnimatedText;
