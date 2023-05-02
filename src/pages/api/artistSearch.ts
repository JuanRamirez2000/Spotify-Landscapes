import { searchForArtist } from "~/lib/spotify";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });

    if (token?.accessToken === undefined)
      throw new Error("Access Token Not Properly Supplied");

    const { artist } = req.query;

    const { accessToken } = token;
    const response = await searchForArtist(accessToken, artist as string);
    const {
      artists: { items },
    } = response.data;
    if (response.status === 200) {
      return res.status(200).json({ items });
    }
  } catch (err) {
    return res
      .status(200)
      .json({ error: "Something Went Wrong Searching For An Artist" });
  }
};

export default handler;
