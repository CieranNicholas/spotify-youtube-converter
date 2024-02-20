import { FaSpotify } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import SpotifySignInButtonClient from "./SpotifySignInButtonClient";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const SpotifySignInButton: React.FC<LinkProps> = ({ className }) => {
  const scopes = ["playlist-read-private", "playlist-read-collaborative"];
  const authEndpoint = `https://accounts.spotify.com/authorize`;
  const authURL = `${authEndpoint}?client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=${scopes.join(
    "%20"
  )}&response_type=code&show_dialog=true`;
  return <SpotifySignInButtonClient className={className} authURL={authURL} />;
};

export default SpotifySignInButton;
