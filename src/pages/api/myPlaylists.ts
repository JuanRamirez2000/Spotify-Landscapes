import { grabUserPlaylists } from "~/lib/spotify";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });
    if (token?.refreshToken === undefined)
      throw new Error("Access Token Returned Null");
    const { refreshToken } = token;
    const response = await grabUserPlaylists(refreshToken);
    const { items } = response.data;
    if (response.status === 200) return res.status(200).json(items);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export default handler;
