import type { AudioFeatures, Tracks } from "~/types/SpotifyTypes";

export default function MergeSpotifyTrackAndAudioFeatures(
  tracks: Tracks[],
  audioFeatures: AudioFeatures[]
) {
  const data = tracks.map((track) => ({
    ...track,
    audioFeatures: {
      ...audioFeatures.find(
        (audioFeature) => audioFeature.id === track.id && audioFeature
      ),
    },
  }));

  return data;
}
