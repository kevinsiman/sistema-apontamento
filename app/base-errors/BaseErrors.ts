export class BaseError extends Error {
  public readonly httpStatus: number;
  public readonly name: string;

  constructor(message: string, httpStatus: number = 500) {
    // Chamando o construtor da classe Error
    super(message);

    // Salva o nome da classe como o nome do erro, por exemplo
    this.name = this.constructor.name;

    this.httpStatus = httpStatus;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequest extends BaseError {
  constructor(public message: string = "Erro na validação dos dados.") {
    super(message, 400);
  }
}

export class NotFoundError extends BaseError {
  constructor(public message: string = "Nao encontrado.") {
    super(message, 404);
  }
}

export class ConflicError extends BaseError {
  constructor(
    public message: string = "Conflito ao tentar adicionar novo status."
  ) {
    super(message, 409);
  }
}

export class InternalError extends BaseError {
  constructor(public message: string = "Erro interno inesperado.") {
    super(message, 500);
  }
}
