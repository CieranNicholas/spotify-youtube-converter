export interface ISpotiyPlaylist {
  href: string;
  items: ISpotifyPlaylistItem[];
  limit: number;
  next: string | null;
  previous: string | null;
  total: number;
}

export interface ISpotifyPlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  owner: ISpotifyUser;
  primary_color: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

interface ISpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

interface ISpotifyUser {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface IPlaylistData {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  owner: ISpotifyUser;
  primary_color: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string;
    items: ISpotifyTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: string;
  uri: string;
}

export interface ISpotifyTrack {
  added_at: string;
  added_by: ISpotifyUser;
  is_local: boolean;
  primary_color: string | null;
  track: ISpotifyTrackItem;
  video_thumbnail: {
    url: string | null;
  };
}

export interface ISpotifyTrackItem {
  album: ISpotifyAlbum;
  artists: ISpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

interface ISpotifyAlbum {
  album_type: string;
  artists: ISpotifyArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ISpotifyArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
  start_date: Date;
}
