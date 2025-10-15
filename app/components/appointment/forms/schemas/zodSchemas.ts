import { z } from "zod";

export const createAppointmentScheama = z.object({
  op: z
    .string()
    .min(4, "A OP deve ter no minimo 4 caracteres.")
    .nonempty("A OP nao pode estar vazia."),
  item: z
    .string()
    .min(4, "O item deve ter no minimo 4 caracteres")
    .nonempty("O item não pode estar vazio."),
  operador: z.string().nonempty("Selecione um operador"),
  tipo: z.string().nonempty("Selecione um operador"),
});

export type createAppointmentFormType = z.infer<
  typeof createAppointmentScheama
>;

export const stopAppointmentSchema = z.object({
  qtd: z.string().min(1),
  obs: z.string(),
});

export type stopAppointmentType = z.infer<typeof stopAppointmentSchema>;
