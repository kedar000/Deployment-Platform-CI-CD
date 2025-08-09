export interface ApiSuccess<T> {
    success: true;
    message: string;
    data: T;
  }
  
  export interface ApiErrorResponse {
    success: false;
    message: string;
    error: {
      code: string;
      details?: any;
    };
  }
  