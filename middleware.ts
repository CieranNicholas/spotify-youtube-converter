import { NextRequest, NextResponse } from "next/server";
import {
  encrypt,
  updateGoogleSession,
  updateSpotitySession,
} from "./lib/auth-lib";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Set User Spotify Session
  if (pathname === "/auth/callback") {
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const code = params.get("code");

    const bodyParams = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams,
    });

    if (response.ok) {
      const data = await response.json();
      const expires = new Date(Date.now() + data.expires_in * 1000);
      const session = await encrypt({ ...data, expires });

      res.cookies.set("spotify-session", session, { expires, httpOnly: true });
    }
  }

  // Update User Spotify Session if it's expired
  const refreshedData = await updateSpotitySession(req);
  if (refreshedData) {
    const encrypted = await encrypt(refreshedData);
    const expires = new Date(Date.now() + refreshedData.expires_in * 1000);
    res.cookies.set("spotify-session", encrypted, {
      expires,
      httpOnly: true,
    });
  }

  // Update User Google Session if it's expired
  const refreshedGoogleData = await updateGoogleSession(req);

  return res;
}

// export const config = {
//   matcher: ["/auth/callback"],
// };
