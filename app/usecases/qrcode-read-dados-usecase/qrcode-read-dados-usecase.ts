import { SpreadsheetRepository } from "@/app/repositories/googlesheets/spreadsheet-repository";

export class QrcodeReadDataUsecase {
  constructor(private SpreadsheetRepository: SpreadsheetRepository) {}
  async execute() {
    const response = await this.SpreadsheetRepository.readData();

    return response;
  }
}
