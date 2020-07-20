import { Response } from "express";

interface ErrorHandler {
  statusCode: number;
  message: string;
}

class ErrorHandler extends Error {
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (err: ErrorHandler, res: Response): void => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
