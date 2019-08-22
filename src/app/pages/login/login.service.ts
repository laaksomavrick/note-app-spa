import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest } from './loginRequest';
import { LoginResponse } from './loginResponse';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    // TODO config
    // TODO superclass OR custom http client wrapper
    private url = 'http://localhost:3000';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
    ) {
    }

    public loginUser(email: string, password: string): Observable<LoginResponse> {
        const loginRequest: LoginRequest = { auth: { email, password } };
        return this.http.post<LoginResponse>(`${this.url}/auth`, loginRequest, this.httpOptions)
            .pipe(
                tap((loginResponse: LoginResponse) => {
                    if (loginResponse.resource) {
                        const token = loginResponse.resource.token;
                        localStorage.setItem('token', token);
                    }
                }),
                // TODO catchError()
            );
    }

}
