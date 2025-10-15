import { SpreadsheetRepository } from "@/app/repositories/googlesheets/spreadsheet-repository";

export class QrcodeReadUsecase {
  constructor(private SpreadsheetRepository: SpreadsheetRepository) {}
  async execute(machine?: string) {
    const response = await this.SpreadsheetRepository.read(machine);

    return response;
  }
}
