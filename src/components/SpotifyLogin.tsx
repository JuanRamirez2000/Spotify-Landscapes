import { signIn } from "next-auth/react";

export default function SpotifyLogin() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <div className="min-h-1/2 inline-flex w-2/5 flex-col items-center rounded-xl bg-base-200 shadow-xl">
        <h1 className="w-4/5 p-12 text-center text-2xl">
          Lets get you started by logging into Spotify
        </h1>
        <div className="p-10">
          <button
            onClick={() => void signIn("spotify")}
            className="btn-primary btn"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
