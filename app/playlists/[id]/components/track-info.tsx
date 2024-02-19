"use client";

import { ISpotifyTrack, ISpotifyArtist } from "@/types";

interface TrackInfoProps {
  track: ISpotifyTrack;
}

function getArtists(artistArray: ISpotifyArtist[]) {
  let artists = "";
  artistArray.forEach((artist) => {
    artists += artist.name + ", ";
  });
  return artists.slice(0, -2);
}

const TrackInfo: React.FC<TrackInfoProps> = ({ track }) => {
  return (
    <div className='flex justify-start items-start bg-neutral-900  hover:bg-neutral-800 rounded p-4 gap-2'>
      <div className='flex flex-col min-w-[10rem] w-[10rem] md:min-w-[20rem] md:w-[20rem]'>
        <p className='text-md truncate'>{track.track.name}</p>
        <div className='flex items-center gap-2'>
          {track.track.explicit && (
            <p className='text-[10px] bg-gray-300 text-neutral-900 rounded-sm w-[15px] h-[15px] text-center'>
              E
            </p>
          )}
          <p className='text-sm truncate'>{getArtists(track.track.artists)}</p>
        </div>
      </div>
      <div className='flex flex-col justify-start items-start'>
        <p className='text-neutral-400'>Album</p>
        <a href={track.track.album.uri} className='hover:underline text-sm'>
          {track.track.album.name}
        </a>
      </div>
    </div>
  );
};

export default TrackInfo;
