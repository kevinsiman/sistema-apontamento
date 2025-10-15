import React from "react";

import {
  QrcodeDataType,
  QrcodeUpdateDataType,
} from "@/app/repositories/qrcode-interface-repository";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  stopAppointmentSchema,
  stopAppointmentType,
} from "./schemas/zodSchemas";
import { queryClient } from "@/app/libs/react-query";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";

interface MachineStopFormProps {
  data: QrcodeDataType;
  action: string;
  label: string;
}

export const MachineStopForm = ({
  data,
  action,
  label,
}: MachineStopFormProps) => {
  const { id } = data;

  const now = dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss");

  const { register, handleSubmit, formState } = useForm<stopAppointmentType>({
    resolver: zodResolver(stopAppointmentSchema),
  });

  const {
    mutateAsync: updateAppointmentFn,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (dados: QrcodeUpdateDataType): Promise<number> => {
      const response = await fetch("/api/qrcode/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      console.log("Data: ", dados);
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

  const onSubmit = async ({ qtd, obs }: any) => {
    try {
      const response = await updateAppointmentFn({
        id,
        fim: now,
        status: action,
        qtd: qtd.toString(),
        obs,
      });

      return response;
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={`w-full ${
            action === "FIM"
              ? "bg-red-600 text-white hover:bg-red-500"
              : "bg-white text-black hover:bg-zinc-50"
          } rounded-lg p-6 text-xl font-bold uppercase transition-transform transform hover:scale-105 active:scale-95 shadow-md`}
        >
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-2 border-red-500">
        <DialogHeader>
          <DialogTitle className="text-white font-bold text-3xl text-center">
            {label}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label
              htmlFor="quantidade"
              className="block text-xl font-medium text-white mb-2"
            >
              Quantidade *
            </Label>
            <Input
              type="number"
              id="quantidade"
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-700  text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              {...register("qtd")}
            />
            {formState.errors.qtd && (
              <span>{formState.errors.qtd.message}</span>
            )}
          </div>
          <div>
            <Label
              htmlFor="obs"
              className="block text-xl font-medium text-white mb-2 mt-5"
            >
              Observação (opcional)
            </Label>
            <textarea
              id="obs"
              rows={4}
              className="w-full px-4 py-3 bg-zinc-800 border border-gray-700 text-white text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              {...register("obs")}
            />
            {formState.errors.obs && (
              <span>{formState.errors.obs.message}</span>
            )}
          </div>
          <Button
            disabled={isPending || isSuccess}
            type="submit"
            className="w-full mt-4 text-xl font-bold py-10"
            variant="destructive"
          >
            {isPending ? (
              <>
                Enviando <CircleNotchIcon className="animate-spin" />
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
