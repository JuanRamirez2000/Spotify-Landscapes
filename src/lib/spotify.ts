import axios from "axios";
import { env } from "~/env.mjs";
import qs from "qs";
import type {
  GrabAudioFeaturesResponse,
  GrabUserCurrentlyPlayingResponse,
  GrabUserPlayistsResponse,
  MyTop20Response,
  SpotifyRequestAccessTokenResponse,
  SpotifySearchResponse,
} from "~/types/SpotifyRequestTypes";
import type { AxiosResponse } from "axios";

const basic = Buffer.from(
  `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

const getSpotifyAccessToken = async (
  refreshToken: string
): Promise<SpotifyRequestAccessTokenResponse> => {
  const res = await axios.post<SpotifyRequestAccessTokenResponse>(
    "https://accounts.spotify.com/api/token",
    qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res.data;
};

export const searchForArtist = async (
  refreshToken: string,
  artist: string
): Promise<AxiosResponse<SpotifySearchResponse>> => {
  const { access_token } = await getSpotifyAccessToken(refreshToken);
  return await axios.get<SpotifySearchResponse>(
    "https://api.spotify.com/v1/search",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        q: artist,
        type: "artist",
        limit: 5,
      },
    }
  );
};

export const grabMyTop20 = async (
  refreshToken: string
): Promise<AxiosResponse<MyTop20Response>> => {
  const { access_token } = await getSpotifyAccessToken(refreshToken);
  return await axios.get<MyTop20Response>(
    "https://api.spotify.com/v1/me/top/tracks",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        limit: 20,
        time_range: "long_term",
      },
    }
  );
};

export const grabUserPlaylists = async (
  refreshToken: string
): Promise<AxiosResponse<GrabUserPlayistsResponse>> => {
  const { access_token } = await getSpotifyAccessToken(refreshToken);
  return await axios.get<GrabUserPlayistsResponse>(
    "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const grabAudioFeaturesForSongs = async (
  refreshToken: string,
  ids: string[]
): Promise<AxiosResponse<GrabAudioFeaturesResponse>> => {
  const { access_token } = await getSpotifyAccessToken(refreshToken);
  return await axios.get<GrabAudioFeaturesResponse>(
    `https://api.spotify.com/v1/audio-features`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        ids: String(ids),
      },
    }
  );
};

export const grabCurrentSong = async (
  refreshToken: string
): Promise<AxiosResponse<GrabUserCurrentlyPlayingResponse>> => {
  const { access_token } = await getSpotifyAccessToken(refreshToken);
  return await axios.get<GrabUserCurrentlyPlayingResponse>(
    `https://api.spotify.com/v1/me/player/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};
