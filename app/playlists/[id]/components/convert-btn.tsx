"use client";

import { useState } from "react";
import Loader from "./loader";
import {
  ConvertSpotify,
  CreatePlaylist,
  PopulatePlaylist,
  simulateFetch,
} from "@/lib/auth-lib";
import toast from "react-hot-toast";
import { IPlaylistData } from "@/types";

enum UPLOAD_STATE {
  GETTING_IDS = "Fetching Youtube Videos",
  CREATING_PLAYLIST = "Creating Youtube Playlist",
  ADDING_VIDEOS = "Adding Videos to Playlist",
}

interface ConvertBtnProps {
  playlistData: IPlaylistData;
  googleSession: any;
}

const ConvertBtn: React.FC<ConvertBtnProps> = ({
  playlistData,
  googleSession,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadState, setUploadState] = useState<UPLOAD_STATE>(
    UPLOAD_STATE.GETTING_IDS
  );
  const [playlistLink, setPlaylistLink] = useState<string>(undefined);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  async function onClick() {
    setLoading(true);
    await simulateFetch();
    setUploadState(UPLOAD_STATE.CREATING_PLAYLIST);

    await simulateFetch();
    setUploadState(UPLOAD_STATE.ADDING_VIDEOS);
    setLoading(false);
    setPlaylistLink(
      "https://www.youtube.com/playlist?list=PLKrxUXq7I3-4b6z0zFbJHbv9mBnJXMpTM"
    );
    setPlaylistCreated(true);
    toast.success("Playlist Created");
  }

  async function playlist() {
    setLoading(true);
    const youtubeIds = await ConvertSpotify(playlistData.tracks.items);
    setUploadState(UPLOAD_STATE.CREATING_PLAYLIST);
    const createdPlaylistData = await CreatePlaylist(
      googleSession.access_token,
      playlistData.name
    );

    if (createdPlaylistData) {
      setUploadState(UPLOAD_STATE.ADDING_VIDEOS);
      const results = await PopulatePlaylist(
        googleSession.access_token,
        createdPlaylistData.id,
        youtubeIds,
        createdPlaylistData.title
      );
      console.log("Populated playlist: ", results);
    }
    setLoading(false);
    setPlaylistLink(
      `https://www.youtube.com/playlist?list=${createdPlaylistData.id}`
    );
    setPlaylistCreated(true);
    setUploadState(UPLOAD_STATE.GETTING_IDS);
    toast.success("Playlist Created.");
  }
  return (
    <>
      {!playlistCreated ? (
        <button
          type='submit'
          className='bg-neutral-300 px-3 py-2 rounded text-black text-md grid place-items-center'
          onClick={playlist}
        >
          {loading ? (
            <div className='flex gap-2 items-center justify-center'>
              <Loader />
              <p>{uploadState}</p>
            </div>
          ) : (
            "Convert to youtube playlist"
          )}
        </button>
      ) : (
        <a
          href={playlistLink}
          className='bg-youtube px-3 py-2 rounded text-white text-md grid place-items-center'
          target='_blank'
        >
          {playlistLink && "Open Youtube Playlist"}
        </a>
      )}
    </>
  );
};

export default ConvertBtn;
