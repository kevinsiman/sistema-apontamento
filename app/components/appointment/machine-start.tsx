import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import { operadores, tipoRadioValues } from "@/app/libs/mock";

import { queryClient } from "@/app/libs/react-query";

import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormInput } from "./form-components/form-input";
import { FormSelect } from "./form-components/form-select";
import { FormRadio } from "./form-components/form-radio";

import { toast } from "sonner";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";

import {
  createAppointmentFormType,
  createAppointmentScheama,
} from "./forms/schemas/zodSchemas";
import { QrcodeCreateDataType } from "@/app/repositories/qrcode-interface-repository";

interface MachineStartProps {
  machine: string;
}

export const MachineStart = ({ machine }: MachineStartProps) => {
  const now = dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss");

  /* Responsavel por startar o formulario com o codigo da leitura do qrcode */
  const searchParams = useSearchParams();

  const { thisOp, thisItem } = useMemo(() => {
    const op = searchParams.get("op");
    const item = searchParams.get("item");
    const OP = searchParams.get("OP");
    const ITEM = searchParams.get("ITEM");

    const thisOp = op ?? OP ?? "";
    const thisItem = item ?? ITEM ?? "";

    return { thisOp, thisItem };
  }, [searchParams]);
  /* ---------------------------------------------------------------------- */

  // React hook Form
  const { register, handleSubmit, formState } =
    useForm<createAppointmentFormType>({
      resolver: zodResolver(createAppointmentScheama),
    });

  const {
    mutateAsync: createAppointmentFn,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: QrcodeCreateDataType): Promise<number> => {
      const response = await fetch("/api/qrcode/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      return response.status;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["dados"] });
      toast.success("Apontamento enviado com sucesso!");
    },
    onError: () => {
      toast.error(`Erro ao enviar o apontamento ${error?.message}`);
    },
  });

  const onSubmit = async (data: createAppointmentFormType) => {
    try {
      await createAppointmentFn({
        id: uuid(),
        inicio: now,
        op: data.op,
        item: data.item,
        maquina: machine,
        operador: data.operador,
        tipo: data.tipo,
        status: "INICIO",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-4">
      <div className="w-full max-w-xl bg-zinc-800 p-8 rounded-xl shadow-lg border-2 border-red-600">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Iniciar Produção <span className="text-red-500">{machine}</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            id="op"
            defaultValue={thisOp}
            label="OP"
            register={register}
            error={formState.errors.op}
          />
          <FormInput
            id="item"
            defaultValue={thisItem}
            label="ITEM"
            register={register}
            error={formState.errors.item}
          />
          <FormSelect
            label="Operador"
            id="operador"
            register={register}
            error={formState.errors.operador}
            options={operadores}
          />
          <div className="space-y-2">
            <span className="block text-xl font-medium text-white mb-2">
              Operação:
            </span>
            <FormRadio
              register={register}
              error={formState.errors.tipo}
              nome="tipo"
              radioValues={tipoRadioValues}
            />
          </div>
          <button
            type="submit"
            disabled={isPending || isSuccess}
            className={`flex justify-center items-center gap-5 w-full text-white rounded-lg p-6 text-xl font-bold uppercase transition-transform transform hover:scale-105 active:scale-95 bg-red-600 disabled:bg-red-600/50 shadow-md`}
          >
            INICIAR {isPending && <CircleNotchIcon className="animate-spin" />}
          </button>
        </form>

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
