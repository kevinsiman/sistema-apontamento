import { NextResponse, NextRequest } from "next/server";
import { QrcodeReadUsecase } from "@/app/usecases/qrcode-read-usecase/qrcode-read-usecase";
import { SpreadsheetRepository } from "@/app/repositories/googlesheets/spreadsheet-repository";
import { BaseError } from "@/app/base-errors/BaseErrors";
import { QrcodeReadDataUsecase } from "@/app/usecases/qrcode-read-dados-usecase/qrcode-read-dados-usecase";

export const POST = async () => {
  const spreadsheet = new SpreadsheetRepository();
  const qrcodeReadData = new QrcodeReadDataUsecase(spreadsheet);

  try {
    const response = await qrcodeReadData.execute();
    return NextResponse.json(response, { status: 200 });
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
