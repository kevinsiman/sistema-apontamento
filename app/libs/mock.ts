export const machineList = [
  "IBARMIA",
  "D800",
  "D1250",
  "YCM",
  "E320",
  "CT40",
  "INDEX",
  "MAZAK",
];

export const operadores = [
  "RICARDO",
  "ANTONIO",
  "RAUL",
  "WILLIAN",
  "JOSE",
  "MATHEUS",
  "JONAS",
  "LEANDRO",
  "OSEIAS",
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
