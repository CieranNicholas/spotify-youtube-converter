"use client";

import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const SpotifySignInButtonClient = ({ className, authURL }) => {
  return (
    <motion.a
      href={authURL}
      className={twMerge(
        "bg-spotify p-4 rounded flex items-center justify-start gap-2",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, bounce: 0.5 }}
    >
      <FaSpotify className='text-xl m-0 p-0' />
      <p>Sign In</p>
    </motion.a>
  );
};

export default SpotifySignInButtonClient;
