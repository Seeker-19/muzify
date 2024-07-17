import { createContext, useContext, useState, ReactNode } from "react";

interface LikedSongsContextProps {
  likedSongs: Set<string>;
  toggleLike: (songId: string) => void;
}

const LikedSongsContext = createContext<LikedSongsContextProps | undefined>(
  undefined
);

export const LikedSongsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) => {
      const newLikedSongs = new Set(prev);
      if (newLikedSongs.has(songId)) {
        newLikedSongs.delete(songId);
      } else {
        newLikedSongs.add(songId);
      }
      return newLikedSongs;
    });
  };

  return (
    <LikedSongsContext.Provider value={{ likedSongs, toggleLike }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => {
  const context = useContext(LikedSongsContext);
  if (!context) {
    throw new Error("useLikedSongs must be used within a LikedSongsProvider");
  }
  return context;
};
