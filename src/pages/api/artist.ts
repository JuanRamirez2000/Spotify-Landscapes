/*
import { grabArtistInfo } from "~/lib/spotify";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });
    const { artistID } = req.query;
    if (token?.accessToken === undefined)
      throw new Error("Access Token Returned Null");

    const { accessToken } = token;
    const response = await grabArtistInfo(accessToken, artistID as string);
    const data = response.data;
    if (response.status === 200) return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export default handler;
*/
