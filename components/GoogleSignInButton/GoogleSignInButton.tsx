import React from "react";
import GoogleSignInButtonClient from "./GoogleSignInButtonClient";

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
    <GoogleSignInButtonClient
      className={className}
      googleAuthURL={googleAuthURL}
    />
  );
};

export default GoogleSignInButton;
