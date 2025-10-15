"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { MachineButton } from "./machine-button";
import { OtherSections } from "../other-sections/other-section-button";
import { useMemo } from "react";

interface MachineListProps {
  machines: string[];
}

export const MachineList = ({ machines }: MachineListProps) => {
  const searchParams = useSearchParams();
  const { thisItem, thisOp } = useMemo(() => {
    const op = searchParams.get("op");
    const item = searchParams.get("item");
    const OP = searchParams.get("OP");
    const ITEM = searchParams.get("ITEM");

    const thisOp = op ?? OP ?? "";
    const thisItem = item ?? ITEM ?? "";

    return { thisOp, thisItem };
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-full text-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-6xl">
        {machines?.map((machine: string, index: number) => (
          <MachineButton
            op={thisOp}
            item={thisItem}
            key={machine + index}
            title={machine}
          />
        ))}
        <OtherSections op={thisOp} item={thisItem} />
      </div>
    </div>
  );
};
