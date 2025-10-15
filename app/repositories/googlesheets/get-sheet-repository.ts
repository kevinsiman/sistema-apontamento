import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { getDoc } from "./get-doc-repository";
import { NotFoundError } from "@/app/base-errors/BaseErrors";

export const getSheet = async (
  page: string
): Promise<GoogleSpreadsheetWorksheet> => {
  const doc = await getDoc();
  const sheet: GoogleSpreadsheetWorksheet = doc.sheetsByTitle[page];

  if (!sheet) {
    throw new NotFoundError("Erro ao buscar pelos dados da Pagina");
  }

  return sheet;
};
