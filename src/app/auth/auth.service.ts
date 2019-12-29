import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpService } from "../http/http.service";
import { AuthFailureResponse, AuthRequest, AuthSuccessResponse } from "./auth.interfaces";

@Injectable({
    providedIn: "root",
})
export class AuthService extends HttpService {
    private readonly TOKEN_KEY = "token";

    constructor(private http: HttpClient) {
        super();
    }

    public authenticateUser(
        email: string,
        password: string,
    ): Observable<AuthSuccessResponse | AuthFailureResponse> {
        const loginRequest: AuthRequest = { auth: { email, password } };
        return this.http.post<AuthSuccessResponse | AuthFailureResponse>(
            `${this.url}/auth`,
            loginRequest,
            this.httpOptions,
        );
    }

    public setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    public getToken(): string | undefined {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token) {
            return token;
        }
        return undefined;
    }

    public isAuthenticated(): Observable<boolean> {
        const token = localStorage.getItem(this.TOKEN_KEY);
        const predicate = token != null;
        return of(predicate);
    }
}
