import { useRouter } from "next/navigation";
import React from "react";

interface OtherSectionsProps {
  op: string;
  item: string;
}

export const OtherSections = ({ op, item }: OtherSectionsProps) => {
  const router = useRouter();
  const handleMachine = () => {
    router.push(
      `/setores/${op && `?op=${op.toLocaleUpperCase()}`}${
        item && `&item=${item.toLocaleUpperCase()}`
      }`
    );
  };
  return (
    <button
      onClick={handleMachine}
      className="btn-machine bg-black w-40 text-white border-2 border-green-600 rounded-2xl p-8 text-2xl font-bold uppercase transition-transform transform hover:scale-105 active:scale-95 shadow-md"
    >
      SETORES
    </button>
  );
};
