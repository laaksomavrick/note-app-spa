import { ApiErrorResponse, ApiResponse } from "../http/http.interfaces";

export interface AuthAttempt {
    email: string;
    password: string;
}

export interface AuthRequest {
    auth: {
        email: string;
        password: string;
    };
}

export interface AuthSuccessResponse extends ApiResponse {
    resource: {
        token: string;
    };
}

// tslint:disable-next-line:no-empty-interface
export interface AuthFailureResponse extends ApiErrorResponse {}

// tslint:disable-next-line:no-any
export function isAuthSuccessResponse(maybe: any): maybe is AuthSuccessResponse {
    return maybe.resource != null;
}
