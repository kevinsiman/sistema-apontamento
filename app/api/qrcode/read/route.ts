import { NextResponse, NextRequest } from "next/server";
import { QrcodeReadUsecase } from "@/app/usecases/qrcode-read-usecase/qrcode-read-usecase";
import { SpreadsheetRepository } from "@/app/repositories/googlesheets/spreadsheet-repository";
import { BaseError } from "@/app/base-errors/BaseErrors";

export const POST = async (req: NextRequest) => {
  const { machine } = await req.json();

  let mac: string = "";

  if (machine) {
    mac = machine.toString().toLocaleUpperCase();
  }
  const spreadsheet = new SpreadsheetRepository();
  const qrcodeRead = new QrcodeReadUsecase(spreadsheet);

  try {
    const response = await qrcodeRead.execute(mac);
    return NextResponse.json(response.reverse(), { status: 200 });
  } catch (error) {
    if (error instanceof BaseError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.httpStatus }
      );
    }
    return NextResponse.json(
      { error: `Erro interno inexperado ${error}` },
      { status: 500 }
    );
  }
};
