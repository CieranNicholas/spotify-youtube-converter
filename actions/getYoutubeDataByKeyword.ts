const youtubesearchapi = require("youtube-search-api");

export interface IYoutubeSearchResult {
  items: IYoutubeSearchResultData[];
}

interface IYoutubeSearchResultData {
  id: string;
  type: string;
  thumbnail: IThumbnail;
  title: string;
  channelTitle: string;
  shortBylineText: any;
  length: Length;
  isLive: false;
}

interface IThumbnail {
  thumbnails: ThumbailData[];
}

interface ThumbailData {
  url: string;
  width: number;
  height: number;
}

interface Length {
  accessibility: {
    accessibilityData: {
      label: string;
    };
  };
  simpleText: string;
}

export interface IYoutubeDataObject {
  id: string;
  type: string;
  thumbnail: IThumbnail;
  title: string;
  length: Length;
  channelTitle: string;
}

export async function getYoutubeDataByKeyword(
  keywords: string
): Promise<IYoutubeDataObject> {
  const playlist = false;
  const limit = 1;
  const options = [{ type: "video" }];

  const res: IYoutubeSearchResult = await youtubesearchapi.GetListByKeyword(
    keywords,
    playlist,
    limit,
    options
  );

  const data = res.items[0];

  return {
    id: data.id,
    title: data.title,
    type: data.type,
    thumbnail: data.thumbnail,
    length: data.length,
    channelTitle: data.channelTitle,
  };
}

export async function getYoutubeIdsByKeyword(
  keywords: string
): Promise<string> {
  const playlist = false;
  const limit = 1;
  const options = [{ type: "video" }];
  const res: IYoutubeSearchResult = await youtubesearchapi.GetListByKeyword(
    keywords,
    playlist,
    limit,
    options
  );
  const data = res.items[0];
  return data.id;
}
