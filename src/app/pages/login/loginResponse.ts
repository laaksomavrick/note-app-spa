export interface LoginResponse {
    status: number;
    resource?: {
        token: string;
    };
}
