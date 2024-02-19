import { getGoogleSession, getSpotifySession } from "@/lib/auth-lib";
import { ISpotifyPlaylistItem } from "@/types";
import PlaylistItem from "./components/playlist-item";
import ToastTrigger from "./components/toast-trigger";

export default async function Playlists() {
  const session = await getSpotifySession();
  const googleSession = await getGoogleSession();
  if (!session || !googleSession) {
    return <ToastTrigger shouldTrigger={!session && !googleSession} />;
  }

  const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=50`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  const data = await res.json();

  return (
    <div className='flex flex-col bg-neutral-950 px-4 sm:px-12 md:px-24 py-24'>
      {/* <h1 className='text-2xl mb-4'>Your Playlists</h1> */}

      <div className='flex flex-wrap gap-4 justify-center sm:justify-start md:justify-between'>
        {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4'> */}
        {data.items.map((playlist: ISpotifyPlaylistItem) => (
          <PlaylistItem playlist={playlist} key={playlist.id} />
        ))}
      </div>
    </div>
  );
}
