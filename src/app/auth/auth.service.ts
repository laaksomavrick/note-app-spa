import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthRequest, AuthResponse } from './auth.interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // TODO injectable config
    private url = 'http://localhost:3000';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {
    }

    public loginUser(email: string, password: string): Observable<AuthResponse> {
        const loginRequest: AuthRequest = { auth: { email, password } };
        return this.http.post<AuthResponse>(
            `${this.url}/auth`,
            loginRequest,
            this.httpOptions,
        );
    }

    public isAuthenticated(): Observable<boolean> {
        const token = localStorage.getItem('token');
        const predicate = token != null;
        return of(predicate);
    }
}
