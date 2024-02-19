import { getGoogleSession, getSpotifySession } from "@/lib/auth-lib";
import NavClient from "./NavClient";

const Nav = async () => {
  const spotifySession = await getSpotifySession();
  const googleSession = await getGoogleSession();

  return (
    <NavClient spotifySession={spotifySession} googleSession={googleSession} />
    // <NavClient spotifySession={true} googleSession={true} />
  );
};

export default Nav;
