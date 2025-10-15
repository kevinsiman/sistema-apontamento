import { NextResponse, NextRequest } from "next/server";
import { QrcodeUpdateUsecase } from "@/app/usecases/qrcode-update-usecase/qrcode-update-usecase";
import { BadRequest, BaseError } from "@/app/base-errors/BaseErrors";
import { SpreadsheetRepository } from "@/app/repositories/googlesheets/spreadsheet-repository";

export const PATCH = async (req: NextRequest) => {
  const { id, fim, qtd, status, obs } = await req.json();

  if (!id || !fim || !qtd) {
    throw new BadRequest("Erro no envio dos parametros.");
  }

  const spreadsheet = new SpreadsheetRepository();
  const qrcodeupdate = new QrcodeUpdateUsecase(spreadsheet);

  try {
    await qrcodeupdate.execute({
      id,
      fim,
      qtd,
      status,
      obs,
    });

    return NextResponse.json(
      { message: "Apontamento atualizado com sucesso," },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof BaseError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.httpStatus }
      );
    }

    return NextResponse.json(
      { erro: `Erro inespeado interno ${error}` },
      { status: 500 }
    );
  }
};
