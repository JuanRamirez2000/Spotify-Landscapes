import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { env } from "~/env.mjs";

const scope =
  "user-read-email,user-read-private,user-top-read,user-read-currently-playing";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${scope}`,
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          id: user.id,
          user,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.id = token.id;
      session.user = token.user;
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
