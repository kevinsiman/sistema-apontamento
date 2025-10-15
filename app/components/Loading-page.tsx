import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <CircleNotchIcon className="animate-spin antialiased text-6xl" />
    </div>
  );
};
