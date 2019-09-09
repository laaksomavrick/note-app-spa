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

export interface AuthResponse {
    status: number;
    resource?: {
        token: string;
    };
    error?: {
        msg: string;
    };
}
