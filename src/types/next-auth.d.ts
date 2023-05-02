import { type DefaultSession } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";
import type { ProviderType } from "next-auth/providers";
import type { Session } from "next-auth";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    error?: string;
    id: string;
  }

  interface Account {
    expires_at: number;
    providerAccountId: string;
    userId?: string;
    provider: string;
    type: ProviderType;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    id: string;
    user?: Session["user"];
  }
}
