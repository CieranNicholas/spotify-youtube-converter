"use client";

import { FaSpotify } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const SpotifySignInButton: React.FC<LinkProps> = ({ className }) => {
  const scopes = ["playlist-read-private", "playlist-read-collaborative"];
  const authEndpoint = `https://accounts.spotify.com/authorize`;
  const authURL = `${authEndpoint}?client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=${scopes.join(
    "%20"
  )}&response_type=code&show_dialog=true`;
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

export default SpotifySignInButton;
