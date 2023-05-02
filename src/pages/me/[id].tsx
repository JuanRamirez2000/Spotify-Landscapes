import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Me() {
  const { data: songs } = useQuery(
    ["spotifyData"],
    async () => await axios.get("/api/myTop20"),
    {
      enabled: false,
    }
  );
  return <div></div>;
}
