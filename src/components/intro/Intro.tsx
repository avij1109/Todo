import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Intro.css";
import illustrate from "../../assets/illustrate.png";

const Intro = () => {
  const navigate = useNavigate();

  const redirectToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="intro-container">
      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="intro-title">
          Welcome to <span className="highlight">TODO</span>
        </h1>
        <p className="intro-subtitle">
          Organize your life, one task at a time
        </p>
        <motion.button
          className="intro-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={redirectToSignup}
        >
          Get Started
        </motion.button>
      </motion.div>
      <motion.div
        className="intro-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img src={illustrate} alt="TODO App Illustration" />
      </motion.div>
    </div>
  );
};

export default Intro;
