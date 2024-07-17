import useAuthModal from "@/hooks/useAuthModal";
import { useLikedSongs } from "@/hooks/useLikedSongs";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikedButtonProps {
  songId: string;
}
const LikeButton: React.FC<LikedButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const { likedSongs, toggleLike } = useLikedSongs();

  const authModal = useAuthModal();

  const player = usePlayer();

  const { user } = useUser();

  const isLiked = likedSongs.has(songId);
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  // useEffect(() => {
  //   if (!user?.id) {
  //     return;
  //   }

  //   const fetchData = async () => {
  //     const { data, error } = await supabaseClient
  //       .from("liked_songs")
  //       .select("*")
  //       .eq("user_id", user.id)
  //       .eq("song_id", songId)
  //       .single();

  //     if (!error && data) {

  //     }

  //     console.log("ds", data);
  //   };

  //   fetchData();
  // }, [songId, supabaseClient, user?.id]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        toggleLike(songId);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ song_id: songId, user_id: user.id });

      if (error) {
        toast.error(error.message);
      } else {
        toggleLike(songId);
        toast.success("Liked");
      }
    }

    router.refresh();
  };

  console.log("is", isLiked);

  return (
    <button onClick={handleLike} className="hover:opacity-70 transition">
      <Icon color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
};

export default LikeButton;
