import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthRequest, AuthResponse } from './auth.interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // TODO injectable config
    // TODO injectable localStorage ???
    public url = 'http://localhost:3000';

    private readonly TOKEN_KEY = 'token';

    // TODO abstract class HttpService
    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    public authenticateUser(email: string, password: string): Observable<AuthResponse> {
        const loginRequest: AuthRequest = { auth: { email, password } };
        return this.http.post<AuthResponse>(
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
