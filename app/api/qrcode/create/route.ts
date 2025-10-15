import { BadRequest, BaseError } from "@/app/base-errors/BaseErrors";
import { SpreadsheetRepository } from "@/app/repositories/googlesheets/spreadsheet-repository";
import { QrcodeCreateUsecase } from "@/app/usecases/qrcode-create-usecase/qrcode-create-usecase";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { id, inicio, op, item, operador, maquina, status, tipo } =
    await request.json();

  if (
    !id ||
    !inicio ||
    !op ||
    !item ||
    !operador ||
    !maquina ||
    !status ||
    !tipo
  ) {
    throw new BadRequest("Erro ao receber parametros!");
  }

  const spreadsheet = new SpreadsheetRepository();
  const qrcodeCreate = new QrcodeCreateUsecase(spreadsheet);

  try {
    const response = await qrcodeCreate.execute({
      id,
      inicio,
      op,
      item,
      operador,
      maquina,
      status,
      tipo,
    });
    return NextResponse.json(
      { message: "Adicionado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof BaseError)
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.httpStatus }
      );
  }

  return NextResponse.json(
    {
      message: "Erro interno inesperado.",
    },
    { status: 500 }
  );
};
