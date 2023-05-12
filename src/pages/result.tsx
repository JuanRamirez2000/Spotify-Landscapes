import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Landscape from "~/components/Landscape";
import SpotifyLogin from "~/components/SpotifyLogin";
import axios from "axios";
import { useRouter } from "next/router";
import ReduceAudioFeaturesFromTracks from "~/helpers/ReduceAudioFeaturesFromTracks";
import type { TracksExpendedWithFeatures } from "~/types/SpotifyTypes";
import type { AverageAudioFeatures } from "~/types/CustomTypes";
import ErrorPage from "~/components/ErrorPage";
import { useState } from "react";

export default function Result() {
  const router = useRouter();
  const [moreInfoBoolean, setMoreInfoBoolean] = useState<boolean>(false);
  const { data: session } = useSession();
  const { data: songsData } = useQuery(
    ["songs"],
    async () =>
      await axios.get<TracksExpendedWithFeatures[]>("/api/currentSongPlaying"),
    {
      enabled: router.isReady,
    }
  );
  if (!session) return <SpotifyLogin />;
  if (songsData?.status !== 200) return <ErrorPage />;

  const sumAudioFeatures: AverageAudioFeatures = ReduceAudioFeaturesFromTracks(
    songsData.data
  );
  return (
    <>
      <Landscape audioFeatures={sumAudioFeatures} />
      <div className="flex w-screen flex-col items-center">
        <h1 className="my-12 text-3xl"> Here is your landscape! </h1>
        <button
          className="btn-primary btn"
          onClick={() => setMoreInfoBoolean(true)}
        >
          Want more info?
        </button>
      </div>
      {moreInfoBoolean && (
        <div>
          <h2>Some stats about your landscape</h2>
        </div>
      )}
    </>
  );
}
