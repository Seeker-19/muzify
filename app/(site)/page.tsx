import Image from "next/image";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import { getSongs } from "@/actions/getSongs";

import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-[#2D2D2D] h-full w-full overflow-hidden overflow-y-auto rounded-l-lg">
      <Header>
        <div className="mb-2 mt-4">
          <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/spo.jpg"
              name="Liked Songs"
              href="/liked"
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-2xl font-semibold">Newest Songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
