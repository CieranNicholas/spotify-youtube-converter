import GoogleSignInButton from "@/components/GoogleSignInButton/GoogleSignInButton";
import SpotifySignInButton from "@/components/SpotifySignInButton/SpotifySignInButton";
import { Spotlight } from "@/components/ui/Spotlight";
import { getGoogleSession, getSpotifySession } from "@/lib/auth-lib";
import { motion } from "framer-motion";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import PageContent from "./components/page-content";

const Auth = async () => {
  const spotifySession = await getSpotifySession();
  const youtubeSession = await getGoogleSession();

  return (
    <main className='h-full w-full relative'>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20'
        fill='white'
      />
      <div className='body-background flex flex-col items-center justify-center backdrop-blur-sm h-full w-full gap-8 p-4 sm:p-12 md:p-24'>
        <PageContent />

        <div className='flex gap-4'>
          {spotifySession ? (
            <div className='bg-spotify px-8 py-4 rounded-full flex items-center justify-start gap-2'>
              <FaSpotify className='text-xl m-0 p-0' />
              <p className='uppercase font-semibold'>CONNECTED</p>
            </div>
          ) : (
            <SpotifySignInButton className='rounded-full px-8 py-4' />
          )}
          {youtubeSession ? (
            <div className='bg-youtube px-8 py-4 rounded-full flex items-center justify-start gap-2'>
              <FaYoutube className='text-xl m-0 p-0' />
              <p className='uppercase font-semibold'>CONNECTED</p>
            </div>
          ) : (
            <GoogleSignInButton className='rounded-full px-8 py-4' />
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;
