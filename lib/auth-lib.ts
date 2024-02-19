"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import {
  getYoutubeDataByKeyword,
  getYoutubeIdsByKeyword,
} from "@/actions/getYoutubeDataByKeyword";
import { ISpotifyTrack } from "@/types";
import cookie from "cookie";

export async function encrypt(payload: any) {
  const key = new TextEncoder().encode(process.env.AUTH_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const key = new TextEncoder().encode(process.env.AUTH_SECRET);
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function logoutSpotify() {
  cookies().set("spotify-session", "", { expires: new Date(0) });
}

export async function getSpotifySession() {
  const session = cookies().get("spotify-session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSpotitySession(request: NextRequest) {
  const session = cookies().get("spotify-session")?.value;
  if (!session) return undefined;
  const parsed = await decrypt(session);
  const isValid = parsed.exp > Date.now() / 1000;

  if (!isValid) {
    const url = "https://accounts.spotify.com/api/token";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),

        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: parsed.refresh_token,
        client_id: process.env.SPOTIFY_CLIENT_ID,
      }),
    });
    if (res.ok) {
      const data = await res.json();

      const resObject = {
        ...data,
        refresh_token: parsed.refresh_token,
      };

      return resObject;
    }
  }

  return undefined;
}

export async function loginGoogle(sessionObject: any) {
  const expires = new Date(Date.now() + sessionObject.expires_in * 1000);
  const session = await encrypt(sessionObject);
  cookies().set("google-session", session, { expires, httpOnly: true });
}

export async function getGoogleSession() {
  const session = cookies().get("google-session")?.value;

  if (!session) return null;
  // console.log(await decrypt(session));
  return await decrypt(session);
}

export async function updateGoogleSession(request: NextRequest) {
  const session = request.cookies.get("google-session")?.value;
  if (!session) return undefined;
  const parsed = await decrypt(session);
  const isValid = parsed.exp > Date.now() / 1000;
  if (!isValid) {
    cookies().set("google-session", "", { expires: new Date(0) });
    return undefined;
  }
}

// probably move this to a different file
export async function ConvertSpotify(tracks: ISpotifyTrack[]) {
  const promises = tracks.map(async (track) => {
    const artists = track.track.artists.map((artist) => artist.name);
    const query = `${track.track.name} - ${artists.join(", ")}`;
    return getYoutubeIdsByKeyword(query);
  });

  const youtubeIds = await Promise.all(promises);
  return youtubeIds;
}

export async function CreatePlaylist(token: string, title: string) {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&key=${process.env.GOOGLE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        snippet: {
          title: title,
          description: "A playlist created by the Spotify to Youtube App",
        },
        // status: {
        //   privacyStatus: "public",
        // },
      }),
    }
  );

  const createdPlaylist = await res.json();
  if (res.ok) {
    return { id: createdPlaylist.id, title: createdPlaylist.snippet.title };
  }
  return undefined;
}

export async function simulateFetch() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("OK");
    }, 1000); // Delay of 1 second
  });
}

// export async function PopulatePlaylist(
//   token: string,
//   playlistId: string,
//   videoIds: string[],
//   playlistTitle: string
// ) {
//   const promises = videoIds.map(async (id) => {
//     const res = await fetch(
//       `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,id,snippet,status&key=${process.env.GOOGLE_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           snippet: {
//             playlistId: playlistId,
//             position: 0,
//             title: playlistTitle,
//             resourceId: {
//               kind: "youtube#video",
//               videoId: id,
//             },
//           },
//         }),
//       }
//     );
//     const data = await res.json();
//     console.log(data.error);
//     return data;
//   });

//   const resolved = await Promise.all(promises);
//   return resolved;
// }

export async function PopulatePlaylist(
  token: string,
  playlistId: string,
  videoIds: string[],
  playlistTitle: string
) {
  const results = [];
  for (const id of videoIds) {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,id,snippet,status&key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          snippet: {
            playlistId: playlistId,
            position: 0,
            title: playlistTitle,
            resourceId: {
              kind: "youtube#video",
              videoId: id,
            },
          },
        }),
      }
    );
    const data = await res.json();
    results.push(data);
  }

  return results;
}
