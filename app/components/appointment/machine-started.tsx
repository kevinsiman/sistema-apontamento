import React from "react";

import { useElapsedTime } from "@/app/hooks/useElapsedTime";
import { QrcodeDataType } from "@/app/repositories/qrcode-interface-repository";

import { MachineStopForm } from "./forms/machine-stop-form";

interface MachineStartedProps {
  data: QrcodeDataType;
  machine: string;
}

export const MachineStarted = ({ data, machine }: MachineStartedProps) => {
  const { inicio, op, item, operador, qtd, status } = data;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-4">
      <div className="w-full max-w-4xl bg-zinc-800 p-8 rounded-xl shadow-lg border-2 border-red-600">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Produção em Andamento <span className="text-red-500">{machine}</span>
        </h2>

        <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
          <div className="flex-1 space-y-4">
            <p className="text-xl">
              <strong className="text-red-500">Inicio:</strong> {inicio}
            </p>
            <p className="text-xl">
              <strong className="text-red-500">OP:</strong> {op}
            </p>
            <p className="text-xl">
              <strong className="text-red-500">Item:</strong>{" "}
              {item?.toLocaleUpperCase()}
            </p>
            <p className="text-xl">
              <strong className="text-red-500">Operador:</strong> {operador}
            </p>
            <p className="text-xl">
              <strong className="text-red-500">Status: </strong>
              <span className="text-yellow-400">{status}</span>
            </p>
            <p className="text-xl">
              <strong className="text-red-500">Quantidade:</strong> {qtd}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center md:items-end">
            <div className="text-3xl font-mono text-red-500 mb-6">
              {useElapsedTime(inicio!)}
            </div>

            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <MachineStopForm
                data={data}
                action="FIM"
                label="Finalizar producao"
              />
              <MachineStopForm
                data={data}
                action="PAUSA"
                label="Pausar producao"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center items-center">
          <a
            href="/"
            className="mt-6 w-full text-center text-gray-400 hover:text-red-500 underline"
          >
            Voltar para a tela inicial
          </a>
        </div>
      </div>
    </div>
  );
};
