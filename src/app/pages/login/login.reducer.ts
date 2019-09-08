import { createReducer, on } from '@ngrx/store';
import { loginAttempt, loginFailure, loginSuccess } from './login.actions';
import { LoginResponse } from './loginResponse';

export interface LoginState {
    token: string | undefined;
    loading: boolean;
    error: string | undefined;
}

export const initialState: LoginState = {
    token: undefined,
    loading: false,
    error: undefined,
};

export const loginReducer = createReducer(
    initialState,
    on(
        loginSuccess,
        (state: LoginState, props: LoginResponse): LoginState => ({
            ...state,
            // tslint:disable-next-line:no-non-null-assertion
            token: props.resource!.token,
            loading: false,
            error: undefined,
        }),
    ),
    on(
        loginFailure,
        (state: LoginState, props: LoginResponse): LoginState => ({
            ...state,
            token: undefined,
            loading: false,
            // tslint:disable-next-line:no-non-null-assertion
            error: props.error!.msg,
        }),
    ),
    on(loginAttempt, (state: LoginState): LoginState => ({ ...state, loading: true })),
);
