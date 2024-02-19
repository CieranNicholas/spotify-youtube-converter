"use client";

import Image from "next/image";
import Link from "next/link";

import { ISpotifyPlaylistItem } from "@/types";

interface PlaylistItemProps {
  playlist: ISpotifyPlaylistItem;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist }) => {
  return (
    <Link
      href={`/playlists/${playlist.id}`}
      className='flex bg-neutral-900 w-full px-2 rounded items-center gap-4 md:flex-col md:items-start md:justify-start md:w-[11rem] md:p-4'
    >
      {playlist.images.length > 0 ? (
        <div className='w-36 h-36 relative'>
          <Image
            src={playlist.images[0].url}
            alt='playlist image'
            fill
            className='object-contain rounded'
          />
        </div>
      ) : (
        <div className='w-36 h-36 relative'>
          <Image
            src='/noplaylistimage.jpeg'
            alt='playlist image'
            fill
            className='object-contain rounded-md'
          />
        </div>
      )}

      <p className='truncate w-[90%]'>{playlist.name}</p>
    </Link>
  );
};

export default PlaylistItem;
