"use client";

import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const GoogleSignInButtonClient = ({ googleAuthURL, className }) => {
  return (
    <motion.a
      href={googleAuthURL}
      className={twMerge(
        "bg-youtube p-4 rounded flex items-center justify-start gap-2",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, bounce: 0.5 }}
    >
      <FaYoutube />
      <p>Sign In</p>
    </motion.a>
  );
};

export default GoogleSignInButtonClient;
