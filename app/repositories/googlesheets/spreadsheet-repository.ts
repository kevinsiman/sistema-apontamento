import { GoogleSpreadsheetRow } from "google-spreadsheet";
import {
  QrcodeCreateDataType,
  QrcodeCreateInterface,
  QrcodeDataType,
  QrcodeReadDataInterface,
  QrcodeReadInterface,
  QrcodeUpdateDataType,
  QrcodeUpdateInterface,
} from "../qrcode-interface-repository";
import { getSheet } from "./get-sheet-repository";
import {
  BadRequest,
  InternalError,
  NotFoundError,
} from "@/app/base-errors/BaseErrors";

const PAGE = process.env.NEXT_PUBLIC_PAGE!;
const DADOS = process.env.NEXT_PUBLIC_DADOS!;

export class SpreadsheetRepository
  implements
    QrcodeCreateInterface,
    QrcodeReadInterface,
    QrcodeUpdateInterface,
    QrcodeReadDataInterface
{
  async create(data: QrcodeCreateDataType): Promise<void> {
    const { id, inicio, op, item, operador, maquina, status, tipo } = data;
    const sheet = await getSheet(PAGE);

    try {
      await sheet.addRow({
        id,
        inicio,
        op,
        item,
        operador,
        maquina,
        status,
        tipo,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async read(machine?: string): Promise<QrcodeDataType[]> {
    const sheet = await getSheet(PAGE);

    let rows: GoogleSpreadsheetRow[] = await sheet.getRows();
    if (!rows) {
      throw new NotFoundError();
    }

    if (machine) {
      rows = rows.filter(
        (row: GoogleSpreadsheetRow) => row.get("maquina") === machine
      );
    }

    const response: QrcodeDataType[] = rows.map(
      (row: GoogleSpreadsheetRow) => row.toObject() as QrcodeDataType
    );

    return response;
  }

  async update(data: QrcodeUpdateDataType): Promise<void> {
    const { id, fim, qtd, obs, status } = data;
    const sheet = await getSheet(PAGE);

    const rows = await sheet.getRows();

    if (!rows) {
      throw new NotFoundError("Nenhuma linha recuperada!");
    }

    const rowToUpdate = rows.find(
      (row: GoogleSpreadsheetRow) => row.get("id") === id
    );

    if (!rowToUpdate) {
      throw new BadRequest("Nenhum item com o id Encontrado!");
    }

    try {
      rowToUpdate.assign({
        id,
        fim,
        qtd,
        status,
        obs: obs ?? "",
      });

      await rowToUpdate.save();
    } catch (error) {
      throw new InternalError("Erro ao salvar o apontamento.");
    }
  }

  async readData(): Promise<any> {
    const sheet = await getSheet("DADOS");

    const rows: GoogleSpreadsheetRow[] = await sheet.getRows();
    if (!rows) {
      throw new NotFoundError();
    }

    const operadores = rows
      .filter((row: GoogleSpreadsheetRow) => row.get("OPERADORES"))
      .map((row: GoogleSpreadsheetRow) => row.get("OPERADORES"));

    const maquinas = rows
      .filter((row: GoogleSpreadsheetRow) => row.get("MAQUINAS"))
      .map((row: GoogleSpreadsheetRow) => row.get("MAQUINAS"));

    const operacoes = rows
      .filter((row: GoogleSpreadsheetRow) => row.get("STATUS"))
      .map((row: GoogleSpreadsheetRow) => row.get("STATUS"));

    const response = [
      {
        operadores,
        maquinas,
        operacoes,
      },
    ];

    return response;
  }
}
