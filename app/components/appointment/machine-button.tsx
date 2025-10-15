"use client";
import { useMemo } from "react";

import { useRouter, useSearchParams } from "next/navigation";

interface MachineButtonProps {
  title: string;
  op: string;
  item: string;
}

export const MachineButton = ({ title, op, item }: MachineButtonProps) => {
  const router = useRouter();
  const handleMachine = (mac: string) => {
    router.push(
      `/apontamento/${mac}${op && `?op=${op.toLocaleUpperCase()}`}${
        item && `&item=${item.toLocaleUpperCase()}`
      }`
    );
  };
  return (
    <button
      onClick={() => handleMachine(title)}
      className="btn-machine bg-black w-40 text-white border-2 border-red-600 rounded-2xl p-8 text-2xl font-bold uppercase transition-transform transform hover:scale-105 active:scale-95 shadow-md"
    >
      {title}
    </button>
  );
};
