import { redirect } from "next/navigation";
import Image from "next/image";

import { getGoogleSession, getSpotifySession } from "@/lib/auth-lib";
import { IPlaylistData, ISpotifyTrack, ISpotifyTrackItem } from "@/types";
import { formatTime } from "@/lib/helpers";
import TrackInfo from "./components/track-info";
import ConvertBtn from "./components/convert-btn";
import GoogleSignInButton from "@/components/GoogleSignInButton/GoogleSignInButton";
import ToastTrigger from "../components/toast-trigger";

interface PlaylistInfoProps {
  params: { id: string };
}

const PlaylistInfo: React.FC<PlaylistInfoProps> = async ({ params }) => {
  const spotifySession = await getSpotifySession();
  const googleSession = await getGoogleSession();

  if (!spotifySession || !googleSession) {
    return <ToastTrigger shouldTrigger={!spotifySession && !googleSession} />;
  }

  const res = await fetch(`https://api.spotify.com/v1/playlists/${params.id}`, {
    headers: {
      Authorization: `Bearer ${spotifySession.access_token}`,
    },
  });

  const playlistData: IPlaylistData = await res.json();

  function getPlaylistTracksLength() {
    let duration: number = 0;
    playlistData.tracks.items.forEach((item: ISpotifyTrack) => {
      duration += item.track.duration_ms;
    });
    return formatTime(duration);
  }

  return (
    <div className='flex flex-col bg-neutral-950 h-full w-full px-4 sm:px-12 md:px-24 py-24'>
      <div className='flex flex-col items-start gap-4 h-full'>
        <div className='flex gap-8'>
          <div className='w-40 h-40 relative shadow-lg '>
            {playlistData.images ? (
              <Image
                src={playlistData.images[0].url}
                alt='playlist image'
                fill
                className='object-contain rounded-md'
              />
            ) : (
              <Image
                src='/noplaylistimage.jpeg'
                alt='playlist image'
                fill
                className='object-contain'
              />
            )}
          </div>
          <div className='flex flex-col justify-between sm:justify-end gap-2 sm:gap-4'>
            <p className='text-xs sm:text-sm'>
              {playlistData.public ? "Public Playlist" : "Private Playlist"}
            </p>
            <h1 className='text-2xl sm:text-5xl font-bold'>
              {playlistData.name}
            </h1>
            <div className='flex flex-col sm:flex-row gap-1 sm:gap-2 text-sm'>
              <a
                href={playlistData.owner.external_urls.spotify}
                className='font-bold hover:underline'
              >
                {playlistData.owner.display_name}
              </a>
              <p>{playlistData.tracks.total} songs</p>
              <p>{getPlaylistTracksLength()}</p>
            </div>
          </div>
        </div>
        <a
          href={playlistData.uri}
          className='bg-green-500 px-3 py-2 rounded text-white text-md'
        >
          Open With Spotify
        </a>

        {googleSession ? (
          <>
            {playlistData.tracks.total > 0 && (
              <ConvertBtn
                playlistData={playlistData}
                googleSession={googleSession}
              />
            )}
          </>
        ) : (
          <div className='flex flex-col items-start gap-2 bg-neutral-900 rounded p-4'>
            <p className='text-sm uppercase'>
              Sign in with youtube to convert your playlist
            </p>
            <GoogleSignInButton className='px-4 py-2' />
          </div>
        )}

        {playlistData.tracks.total > 0 ? (
          <div className='flex flex-col gap-2 w-full'>
            {playlistData.tracks.items.map((track: ISpotifyTrack) => (
              <TrackInfo track={track} key={track.track.id} />
            ))}
          </div>
        ) : (
          <p>This playlist is empty</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistInfo;
