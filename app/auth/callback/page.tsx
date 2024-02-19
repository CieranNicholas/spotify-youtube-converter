import { getSpotifySession } from "@/lib/auth-lib";
import { redirect } from "next/navigation";

const Callback = async () => {
  redirect("/auth");
  return <></>;
};

export default Callback;
