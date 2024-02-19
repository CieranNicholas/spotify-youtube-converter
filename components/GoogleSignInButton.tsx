"use client";

import React from "react";
import { FaYoutube } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const GoogleSignInButton: React.FC<LinkProps> = ({ className }) => {
  const googleScopes = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtubepartner",
    "https://www.googleapis.com/auth/youtube.force-ssl",
  ];
  const googleAuthEndpoint = `https://accounts.google.com/o/oauth2/v2/auth`;
  const googleAuthURL = `${googleAuthEndpoint}?scope=${googleScopes.join(
    "%20"
  )}&include_granted_scope=true&response_type=token&redirect_uri=${
    process.env.GOOGLE_REDIRECT_URI
  }&client_id=${process.env.GOOGLE_CLIENT_ID}&prompt=consent`;
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

export default GoogleSignInButton;
