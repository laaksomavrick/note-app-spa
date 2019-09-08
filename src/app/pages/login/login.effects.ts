import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { loginAttempt, loginFailure, loginSuccess } from './login.actions';
import { LoginService } from './login.service';
import { LoginAttempt } from './loginAttempt';
import { LoginResponse } from './loginResponse';

@Injectable()
export class LoginEffects {
    public login$ = createEffect(() =>
        this.actions$.pipe(
            tap(() => console.log('here')),
            ofType(loginAttempt.type),
            exhaustMap((action: LoginAttempt) =>
                this.loginService.loginUser(action.email, action.password).pipe(
                    map((loginResponse: LoginResponse) => {
                        if (loginResponse.resource) {
                            const token = loginResponse.resource.token;
                            localStorage.setItem('token', token);
                            this.router.navigate(['/']);
                        }
                        return loginSuccess(loginResponse);
                    }),
                    catchError(({ error }) => {
                        return of(loginFailure(error));
                    }),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly loginService: LoginService,
        private readonly router: Router,
    ) {}
}
