"use client";

import { LikedSongsProvider } from "@/hooks/useLikedSongs";

interface UserProviderProps {
  children: React.ReactNode;
}

const LikedSongsProviderNeed: React.FC<UserProviderProps> = ({ children }) => {
  return <LikedSongsProvider>{children}</LikedSongsProvider>;
};

export default LikedSongsProviderNeed;
