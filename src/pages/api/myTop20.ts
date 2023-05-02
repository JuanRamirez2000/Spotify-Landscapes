import { grabAudioFeaturesForSongs, grabMyTop20 } from "~/lib/spotify";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import MergeSpotifyTrackAndAudioFeatures from "~/helpers/MergeSpotifyTrackAndAudioFeatures";
import type { Tracks } from "~/types/SpotifyTypes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });
    if (token?.refreshToken === undefined)
      throw new Error("Access Token Returned Null");
    const { refreshToken } = token;
    const response = await grabMyTop20(refreshToken);

    if (response.status === 200) {
      const { items } = response.data;
      const spotifyIDs = items.map((song) => song.id);
      const audioFeaturesResponse = await grabAudioFeaturesForSongs(
        refreshToken,
        spotifyIDs
      );
      const { audio_features } = audioFeaturesResponse.data;

      const data = MergeSpotifyTrackAndAudioFeatures(
        items as Tracks[],
        audio_features
      );

      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export default handler;
