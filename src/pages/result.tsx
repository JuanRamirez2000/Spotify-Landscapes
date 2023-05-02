import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Landscape from "~/components/Landscape";
import SpotifyLogin from "~/components/SpotifyLogin";
import axios from "axios";
import { useRouter } from "next/router";
import ReduceAudioFeaturesFromTracks from "~/helpers/ReduceAudioFeaturesFromTracks";
import type { TracksExpendedWithFeatures } from "~/types/SpotifyTypes";
import type { AverageAudioFeatures } from "~/types/CustomTypes";
import {
  MusicalNoteIcon,
  Battery100Icon,
  Battery50Icon,
  UserGroupIcon,
  UserIcon,
  FaceFrownIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

export default function Result() {
  const router = useRouter();
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

  if (!songsData) {
    return <h1>Error</h1>;
  }
  const sumAudioFeatures: AverageAudioFeatures = ReduceAudioFeaturesFromTracks(
    songsData.data
  );
  console.log(sumAudioFeatures);
  return (
    <div>
      <Landscape audioFeatures={sumAudioFeatures} />
      <div className="md:flex md:flex-col md:items-center">
        <div className="stats  stats-vertical lg:stats-horizontal">
          <div className="stat">
            <div className="stat-figure text-secondary-focus">
              <MusicalNoteIcon className="h-28 w-28" />
            </div>
            <div className="stat-title text-xl text-secondary-content">
              Mode
            </div>
            <div className="stat-value">
              {sumAudioFeatures.averageMode === 0 ? (
                <span>Minor</span>
              ) : (
                <span>Major</span>
              )}
            </div>
            <div className="stat-desc">Shows Day / Night</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary-focus">
              {sumAudioFeatures.averageEnergy < 0.5 ? (
                <Battery50Icon className="h-28 w-28" />
              ) : (
                <Battery100Icon className="h-28 w-28" />
              )}
            </div>
            <div className="stat-title text-xl text-secondary-content">
              {" "}
              Energy{" "}
            </div>
            <div className="stat-value">
              {sumAudioFeatures.averageEnergy < 0.5 ? (
                <span>Low Energy</span>
              ) : (
                <span>High Energy</span>
              )}
            </div>
            <div className="stat-desc">Makes mountains more jagged</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary-focus">
              {sumAudioFeatures.averageDanceability < 0.5 ? (
                <UserIcon className="h-28 w-28" />
              ) : (
                <UserGroupIcon className="h-28 w-28" />
              )}
            </div>
            <div className="stat-title text-xl text-secondary-content">
              {" "}
              Danceability{" "}
            </div>
            <div className="stat-value">
              {sumAudioFeatures.averageDanceability < 0.5 ? (
                <span>Low Dance Energy</span>
              ) : (
                <span>High Dance Energy</span>
              )}
            </div>
            <div className="stat-desc">
              Displays more clouds/stars in the sky
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary-focus">
              {sumAudioFeatures.averageValence < 0.5 ? (
                <FaceFrownIcon className="h-28 w-28" />
              ) : (
                <FaceSmileIcon className="h-28 w-28" />
              )}
            </div>
            <div className="stat-title text-xl text-secondary-content">
              {" "}
              Mood{" "}
            </div>
            <div className="stat-value">
              {sumAudioFeatures.averageValence < 0.5 ? (
                <span>Sad</span>
              ) : (
                <span>Happy</span>
              )}
            </div>
            <div className="stat-desc">Changes color of mountains</div>
          </div>
        </div>
      </div>
    </div>
  );
}
