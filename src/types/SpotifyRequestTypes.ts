import type {
  Artist,
  AudioFeatures,
  Tracks,
  SimplifiedPlaylistObject,
} from "./SpotifyTypes";

interface SpotifyRequestAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: string;
  refresh_token: string;
}

///* Search API Endpoint

interface SearchReponseBase {
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previos: string | null;
    total: number;
  };
}

interface SpotifySearchResponse {
  artists: SearchReponseBase & {
    items: Artist[];
  };
}

interface MyTop20Response {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Artist[] | Tracks[];
}

interface GrabUserPlayistsResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedPlaylistObject[];
}

interface GrabUserCurrentlyPlayingResponse {
  device: {
    id: string | null;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_precent: number | null;
  };
  repeate_state: string;
  shuffle_stake: boolean;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
      uri: string;
    };
  };
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Tracks;
  currently_playing_type: string;
  actions: {
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle: boolean;
    toggling_repeat_track: boolean;
    transfering_playback: boolean;
  };
}

interface GrabAudioFeaturesResponse {
  audio_features: AudioFeatures[];
}

export type {
  SpotifyRequestAccessTokenResponse,
  SpotifySearchResponse,
  GrabAudioFeaturesResponse,
  MyTop20Response,
  GrabUserPlayistsResponse,
  GrabUserCurrentlyPlayingResponse,
};
