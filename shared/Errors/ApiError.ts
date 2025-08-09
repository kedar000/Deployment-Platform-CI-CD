// shared/errors/ApiError.ts
export class ApiError extends Error {
    public statusCode: number;
    public code: string;
    public details?: any;
  
    constructor(code: string, statusCode = 400, details?: any) {
      super(code); // Keep 'code' as error message internally
      this.statusCode = statusCode;
      this.code = code;
      this.details = details;
    }
  }
  