import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*,songs(*)")
    .eq("user_id", sessionData.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }

  console.log(data);

  return data.map((item) => ({ ...item.songs })) || [];
};
