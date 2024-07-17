import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import { getSongsByUserId } from "@/actions/getSongsByUser";
import Player from "@/components/Player";
import LikedSongsProviderNeed from "@/providers/LikedSongsProviderNeed";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muzify",
  description: "Listen to Music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <LikedSongsProviderNeed>
              <Sidebar songs={userSongs}>{children}</Sidebar>
              <Player />
            </LikedSongsProviderNeed>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
