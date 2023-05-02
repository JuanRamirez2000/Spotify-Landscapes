import type { TracksExpendedWithFeatures } from "~/types/SpotifyTypes";

export default function ReduceAudioFeaturesFromTracks(
  tracks: TracksExpendedWithFeatures[]
) {
  const audioFeatures = tracks.map((track) => track.audioFeatures);
  const totalValence =
    audioFeatures.reduce((total, { valence }) => total + valence, 0) /
    audioFeatures.length;

  const totalEnergy =
    audioFeatures.reduce((total, { energy }) => total + energy, 0) /
    audioFeatures.length;

  const totalDanceability =
    audioFeatures.reduce((total, { danceability }) => total + danceability, 0) /
    audioFeatures.length;

  const totalMode =
    audioFeatures.reduce((total, { mode }) => total + mode, 0) /
      audioFeatures.length <
    0.5
      ? 0
      : 1;

  return {
    averageValence: totalValence,
    averageEnergy: totalEnergy,
    averageDanceability: totalDanceability,
    averageMode: totalMode,
  };
}
