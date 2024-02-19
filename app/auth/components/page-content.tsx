"use client";

import { motion } from "framer-motion";

const PageContent = () => {
  return (
    <motion.h1
      className='text-5xl font-semibold w-2/3 text-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, bounce: 0.5 }}
    >
      Connect Your Spotify and Youtube Accounts to Get Started
    </motion.h1>
  );
};

export default PageContent;
