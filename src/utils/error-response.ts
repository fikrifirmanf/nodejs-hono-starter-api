interface ErrorResponse {
  error: {
    code?: string;
    message: string;
  };
}

export function errorResponse(message: string, code?: string): ErrorResponse {
  return {
    error: {
      message,
      ...(code && { code }),
    },
  };
}
