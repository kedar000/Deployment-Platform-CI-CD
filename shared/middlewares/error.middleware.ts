// shared/middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../Errors/ApiError";
import { sendError } from "../utils/api.utils";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return sendError(res, err.code, err.statusCode, err.details);
  }

  console.error(err); // Log unexpected errors

  return sendError(res, "INTERNAL_SERVER_ERROR", 500);
}
