"use client";
import Box from "@/components/Box";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  console.log("LOADING");
  return (
    <Box className="h-full flex items-center justify-center">
      <BounceLoader color="#22c55e"></BounceLoader>
    </Box>
  );
};

export default Loading;
