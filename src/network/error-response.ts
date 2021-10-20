class ErrorResponse {
  constructor(
    public title: string,
    public status: number,
    public detail?: string
  ) {}
}

function isErrorResponse(obj: any): obj is ErrorResponse {
  return (
    typeof obj.title === "string" &&
    typeof obj.status === "number" &&
    (!obj.detail || typeof obj.detail === "string")
  )
}

class ValidationErrorResponse<T = any> extends ErrorResponse {
  constructor(
    public title: string,
    public status: number,
    public detail: string,
    public violations: T
  ) {
    super(title, status, detail)
  }
}

class IllegalPaymentAttemptErrorResponse extends ErrorResponse {}

class InvalidTicketCodeErrorResponse extends ErrorResponse {}

class InvalidInputDataFormatErrorResponse extends ErrorResponse {}

export {
  ErrorResponse,
  isErrorResponse,
  ValidationErrorResponse,
  IllegalPaymentAttemptErrorResponse,
  InvalidTicketCodeErrorResponse,
  InvalidInputDataFormatErrorResponse,
}
