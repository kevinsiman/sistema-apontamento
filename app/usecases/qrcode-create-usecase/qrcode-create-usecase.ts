import {
  QrcodeCreateDataType,
  QrcodeCreateInterface,
} from "@/app/repositories/qrcode-interface-repository";

export class QrcodeCreateUsecase {
  constructor(private QrcodeCreateInterface: QrcodeCreateInterface) {}

  // Futuramente, criar a interface do data type sepadado dos repositorios
  async execute(data: QrcodeCreateDataType) {
    const response = await this.QrcodeCreateInterface.create(data);
    return response;
  }
}
