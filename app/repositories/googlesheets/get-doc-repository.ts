import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { BadRequest } from "@/app/base-errors/BaseErrors";

const KEY = process.env.NEXT_PUBLIC_KEY!.replace(/\\n/g, "\n");
const EMAIL = process.env.NEXT_PUBLIC_EMAIL!;
const SHEET = process.env.NEXT_PUBLIC_SHEET!;

export const getDoc = async (): Promise<GoogleSpreadsheet> => {
  const serviceAccountAuth = new JWT({
    email: EMAIL,
    key: KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(SHEET, serviceAccountAuth);

  try {
    await doc.loadInfo();
    return doc;
  } catch (error) {
    throw new BadRequest("Erro ao buscar dados da Planilha!");
  }
};
