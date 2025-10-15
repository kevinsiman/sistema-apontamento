"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// Components
import { Loading } from "@/app/components/Loading-page";
import { MachineStarted } from "@/app/components/appointment/machine-started";
import { MachineStart } from "@/app/components/appointment/machine-start";
import { QrcodeDataType } from "@/app/repositories/qrcode-interface-repository";

type paramsType = {
  machine: string;
};

const fetchData = async ({
  machine,
}: paramsType): Promise<QrcodeDataType[]> => {
  const body: Record<string, string> = {};

  if (machine) {
    body.machine = machine;
  }

  try {
    const response = await fetch("/api/qrcode/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    throw new Error();
  }
};

export default function Home() {
  const params = useParams();
  const machine = params?.machine?.toString() ?? "";

  const { data, error, isLoading, refetch, isSuccess } = useQuery<
    QrcodeDataType[],
    Error
  >({
    queryKey: ["dados", machine],
    queryFn: () => fetchData({ machine }),
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Erro: {(error as Error).message}</p>;

  if (isSuccess && data) {
    const machineData: QrcodeDataType = data[0];

    return (
      <>
        {machineData.fim ? (
          <MachineStart machine={machine} />
        ) : (
          <MachineStarted machine={machine} data={machineData} />
        )}
      </>
    );
  }
}
