export const machineList = [
  "CNC1",
  "CNC2",
  "CNC3",
  "CNC4",
  "TORNO-1",
  "TORNO-2",
  "TORNO-3",
  "TORNO-4",
];

export const operadores = [
  "OPERADOR-1",
  "OPERADOR-2",
  "OPERADOR-3",
  "OPERADOR-4",
  "OPERADOR-5",
];

export type radioValueTypes = {
  value: string;
  label: string;
};

export const tipoRadioValues = [
  { value: "PREPARACAO", label: "Preparação" },
  { value: "PRODUCAO", label: "Produção" },
  { value: "RETRABALHO", label: "Retrabalho" },
];

export const setores = [
  { setor: "qualidade", link: "/" },
  { setor: "recebimento", link: "/" },
  { setor: "faturamento", link: "/" },
  { setor: "expedicao", link: "/" },
];
