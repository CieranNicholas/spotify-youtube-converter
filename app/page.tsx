import { getGoogleSession, getSpotifySession } from "@/lib/auth-lib";
import Link from "next/link";
import { PiPlaylistFill } from "react-icons/pi";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import CallToAction from "./components/call-to-action";

const Home = async () => {
  const spotifySession = await getSpotifySession();
  const googleSession = await getGoogleSession();

  const words = `Effortlessly convert Spotify Playlists to YouTube`;

  const words2 = `Tunebridge let's you easily convert your spotify playlists to
  youtube playlists with a click of a button.`;

  return (
    <main className='h-full w-full'>
      <div className='flex flex-col items-start justify-center backdrop-blur-sm h-full w-full gap-8 p-4 sm:p-12 md:p-24 body-background'>
        <div className='flex flex-col gap-8'>
          <TextGenerateEffect
            words={words}
            className='text-4xl text-transparent bg-clip-text bg-gradient-to-r from-spotify via-green-500'
          />
          <TextGenerateEffect
            words={words2}
            className='text-xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-spotify via-green-500'
          />
        </div>
        <div className='flex'>
          <CallToAction shouldShow={spotifySession && googleSession} />
        </div>
      </div>
    </main>
  );
};

export default Home;
