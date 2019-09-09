import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { authAttempt, authFailure, authSuccess } from './auth.actions';
import { AuthAttempt, AuthResponse } from './auth.interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
    public authorize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authAttempt.type),
            exhaustMap((action: AuthAttempt) =>
                this.loginService.loginUser(action.email, action.password).pipe(
                    map((loginResponse: AuthResponse) => {
                        if (loginResponse.resource) {
                            const token = loginResponse.resource.token;
                            localStorage.setItem('token', token);
                            this.router.navigate(['/']);
                        }
                        return authSuccess(loginResponse);
                    }),
                    catchError(({ error }) => {
                        return of(authFailure(error));
                    }),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly loginService: AuthService,
        private readonly router: Router,
    ) {
    }
}
