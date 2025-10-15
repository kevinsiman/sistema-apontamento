export interface QrcodeDataType {
  id: string;
  inicio?: string;
  fim?: string;
  op?: string;
  item?: string;
  operador?: string;
  maquina?: string;
  status?: string;
  qtd?: string;
  obs?: string;
  tipo: string;
  duracao?: string;
}

export interface QrcodeCreateDataType {
  id: string;
  inicio: string;
  op: string;
  item: string;
  operador: string;
  maquina: string;
  status: string;
  tipo: string;
}

export interface QrcodeUpdateDataType {
  id: string;
  fim: string;
  status: string;
  qtd: string;
  obs?: string;
}

export interface QrcodeReadDataType {
  operadores: string[];
  maquinas: string[];
  operacoes: string[];
}

export interface QrcodeCreateInterface {
  create: (data: QrcodeCreateDataType) => Promise<void>;
}

// Alterar a logica do Read para aceitar parametros
export interface QrcodeReadInterface {
  read: (machine?: string) => Promise<QrcodeDataType[]>;
}

export interface QrcodeUpdateInterface {
  update: (data: QrcodeUpdateDataType) => Promise<void>;
}

export interface QrcodeReadDataInterface {
  readData: () => Promise<any>;
}
