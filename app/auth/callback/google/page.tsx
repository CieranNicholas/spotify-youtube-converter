"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getSpotifySession, loginGoogle } from "@/lib/auth-lib";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const GoogleCallback = () => {
  const [hasLoginRun, setHasLoginRun] = useState(false);
  const [spotifySessionExists, setSpotifySessionExists] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    if (!params.has("access_token")) {
      console.log("No access token");
      return redirect("/");
    }

    const sessionObject = {
      access_token: params.get("access_token"),
      token_type: params.get("token_type"),
      expires_in: parseInt(params.get("expires_in")),
      scope: params.get("scope"),
    };

    async function serverActionTest() {
      await loginGoogle(sessionObject);
      const spotifySession = await getSpotifySession();
      setSpotifySessionExists(spotifySession ? true : false);
      setHasLoginRun(true);
      toast.success("Successfully connected youtube account");
    }
    serverActionTest();
  }, []);

  useEffect(() => {
    if (hasLoginRun) {
      if (spotifySessionExists) {
        redirect("/playlists");
      } else {
        redirect("/auth");
      }
    }
  }, [hasLoginRun]);

  return (
    <div className='grid place-items-center h-full w-full'>
      <ClipLoader loading={true} color='#FF0000' size={100} className='col' />
    </div>
  );
};

export default GoogleCallback;
