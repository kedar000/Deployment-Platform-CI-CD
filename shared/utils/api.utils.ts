import { Response } from "express";
import { ApiSuccess,ApiErrorResponse } from "../types/api.types";
import { ERROR_MESSAGES } from "../types/errorCodes";
// Send success response
export function sendSuccess<T>(res: Response,data: T,message: string = "Success",statusCode: number = 200) {
  const response: ApiSuccess<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
}

// Send error response
export function sendError(res: Response,code: string,statusCode: number = 400,details?: any
) {
  const response: ApiErrorResponse = {
    success: false,
    message:ERROR_MESSAGES[code]||"unknown error",
    error: { code, details },
  };
  return res.status(statusCode).json(response);
}
