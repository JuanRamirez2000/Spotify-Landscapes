import { signIn } from "next-auth/react";

export default function SpotifyLogin() {
  return (
    <div>
      <button
        onClick={() => void signIn("spotify")}
        className="btn-primary btn"
      >
        Sign In
      </button>
    </div>
  );
}
