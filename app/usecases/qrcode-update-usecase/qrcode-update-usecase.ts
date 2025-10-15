import { SpreadsheetRepository } from "@/app/repositories/googlesheets/spreadsheet-repository";
import { QrcodeUpdateDataType } from "@/app/repositories/qrcode-interface-repository";

export class QrcodeUpdateUsecase {
  constructor(private SpreadsheetRepository: SpreadsheetRepository) {}

  async execute(data: QrcodeUpdateDataType) {
    const response = this.SpreadsheetRepository.update(data);

    return response;
  }
}
