import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SpotifyLogin from "~/components/SpotifyLogin";
import axios from "axios";
import type { SimplifiedPlaylistObject } from "~/types/SpotifyTypes";
import {
  MusicalNoteIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Options() {
  const [userSelectionType, setUserSelectionType] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();
  const { data: playlists } = useQuery(
    ["userPlaylists"],
    async () => await axios.get<SimplifiedPlaylistObject[]>("/api/myPlaylists"),
    {
      enabled: router.isReady,
    }
  );

  if (!session) return <SpotifyLogin />;
  return (
    <>
      <section className="flex w-full flex-col items-center justify-around gap-4 md:flex-row">
        <div
          className="card bg-base-100 shadow-xl hover:cursor-pointer sm:w-64 md:w-96"
          onClick={() => setUserSelectionType("user")}
        >
          <div className="card-body items-center">
            <DocumentTextIcon className="h-20 w-20 text-secondary-focus md:h-32 md:w-32" />
            <p className="card-title text-xl text-base-content md:text-4xl">
              Anyalyze my data
            </p>
          </div>
        </div>
        <div
          className="hover:pointer card bg-base-100 shadow-xl hover:cursor-pointer sm:w-64 md:w-96"
          onClick={() => setUserSelectionType("song")}
        >
          <div className="card-body items-center">
            <MusicalNoteIcon className="h-20 w-20 text-secondary-focus md:h-32 md:w-32" />
            <p className="card-title text-xl text-base-content md:text-4xl">
              Search for a song
            </p>
          </div>
        </div>
        <div
          className="card bg-base-100 shadow-xl hover:cursor-pointer sm:w-64 md:w-96"
          onClick={() => setUserSelectionType("artist")}
        >
          <div className="card-body items-center">
            <UserGroupIcon className="h-20 w-20 text-secondary-focus md:h-32 md:w-32" />
            <p className="card-title text-xl text-base-content md:text-4xl">
              Search for a artist
            </p>
          </div>
        </div>
      </section>
      <section>
        {userSelectionType === "user" && (
          <div className="text-4xl">
            <p> Testing User</p>
          </div>
        )}
        {userSelectionType && ("song" || "artist") (
          <div>
            <input type="text" name="" id="" />
          </div>
        )}
      </section>
    </>
  );
}
