import { getSongsByTitle } from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  console.log(searchParams);
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div className="bg-[#2D2D2D] h-full w-full overflow-y-auto overflow-hidden rounded-md">
      <Header gradient={true}>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
