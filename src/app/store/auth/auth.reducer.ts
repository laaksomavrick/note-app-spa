import { ActionReducer, createReducer, on } from '@ngrx/store';
import { AuthResponse } from '../../auth/auth.interfaces';
import { AuthActions, authAttempt, authDismissError, authFailure, authSuccess } from './auth.actions';

export interface AuthState {
    token: string | undefined;
    loading: boolean;
    error: string | undefined;
}

export const initialState: AuthState = {
    token: undefined,
    loading: false,
    error: undefined,
};

export const _authReducer = createReducer<AuthState, AuthActions>(
    initialState,
    on(
        authSuccess,
        (state: AuthState, props: AuthResponse): AuthState => ({
            ...state,
            // tslint:disable-next-line:no-non-null-assertion
            token: props.resource!.token,
            loading: false,
            error: undefined,
        }),
    ),
    on(
        authFailure,
        (state: AuthState, props: AuthResponse): AuthState => ({
            ...state,
            token: undefined,
            loading: false,
            // tslint:disable-next-line:no-non-null-assertion
            error: props.error!.msg,
        }),
    ),
    on(authAttempt, (state: AuthState): AuthState => ({ ...state, loading: true })),
    on(authDismissError, (state: AuthState): AuthState => ({ ...state, error: undefined })),
);

// tslint:disable-next-line:typedef
export function authReducer(state: AuthState | undefined, actions: AuthActions) {
    return _authReducer(state, actions);
}
