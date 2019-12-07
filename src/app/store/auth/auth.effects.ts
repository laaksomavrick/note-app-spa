import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthAttempt, AuthResponse } from '../../auth/auth.interfaces';
import { AuthService } from '../../auth/auth.service';
import { authAttempt, authFailure, authSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
    public authorize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authAttempt.type),
            exhaustMap((action: AuthAttempt) =>
                this.authService.authenticateUser(action.email, action.password).pipe(
                    map((authResponse: AuthResponse) => {
                        if (authResponse.resource) {
                            const token = authResponse.resource.token;
                            this.authService.setToken(token);
                            // TODO fix dangling promise
                            this.router.navigate(['/']);
                        }
                        return authSuccess(authResponse);
                    }),
                    // tslint:disable-next-line:typedef
                    catchError(({ error }) => {
                        return of(authFailure(error));
                    }),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {}
}
