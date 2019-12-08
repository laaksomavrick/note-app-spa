export interface ApiResponse {
    status: number;
}

export interface ApiErrorResponse extends ApiResponse {
    error: {
        msg: string;
    };
}
