"use client";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

import { useRouter } from "next/navigation";
import Button from "./Button";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";

const Header: React.FC<HeaderProps> = ({
  children,
  className,
  gradient = false,
}) => {
  const router = useRouter();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      console.log(error);
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  console.log(user);

  const [open, setOpen] = useState(false);
  return (
    <div
      className={`h-fit ${
        gradient
          ? "bg-gradient-to-b from-bg-[#2D2D2D]"
          : "bg-gradient-to-b from-orange-500"
      } p-6 ${className} relative`}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} />
          </button>
        </div>

        <div className="flex md:hidden items-center gap-x-2">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-70 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-70 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-2">
          {user ? (
            <div className="flex gap-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                className="bg-white rounded-full"
                onClick={() => setOpen((prev) => !prev)}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => {
                    console.log("click");
                    authModal.onOpen();
                  }}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    console.log("click");
                    authModal.onOpen();
                  }}
                  className="bg-white px-6 py-2"
                >
                  Login In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {user && (
        <div
          className={`absolute right-2 bg-gray-300 opacity-80 font-bold text-black p-2 rounded-md w-50 transition-opacity ease-in-out duration-700`}
          style={{ opacity: open ? 1 : 0 }}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="hover:scale-105 transition-transform">
              {user.user_metadata.name}
            </p>
            <p className="break-words">{user.user_metadata.email}</p>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default Header;
