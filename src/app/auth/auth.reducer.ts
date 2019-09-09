import { createReducer, on } from '@ngrx/store';
import { authAttempt, authFailure, authSuccess } from './auth.actions';
import { AuthResponse } from './auth.interfaces';

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

export const authReducer = createReducer(
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
);
