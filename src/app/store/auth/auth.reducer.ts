import { createReducer, on } from "@ngrx/store";
import { AuthFailureResponse, AuthSuccessResponse } from "../../auth/auth.interfaces";
import { getHumanReadableApiError } from "../../http/http.helpers";
import {
    AuthActions,
    authAttempt,
    authDismissError,
    authFailure,
    authSuccess,
} from "./auth.actions";

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
        (state: AuthState, props: AuthSuccessResponse): AuthState => {
            return {
                ...state,
                token: props.resource.token,
                loading: false,
                error: undefined,
            };
        },
    ),
    on(
        authFailure,
        (state: AuthState, props: AuthFailureResponse): AuthState => ({
            ...state,
            token: undefined,
            loading: false,
            error: getHumanReadableApiError(props),
        }),
    ),
    on(authAttempt, (state: AuthState): AuthState => ({ ...state, loading: true })),
    on(authDismissError, (state: AuthState): AuthState => ({ ...state, error: undefined })),
);

// tslint:disable-next-line:typedef
export function authReducer(state: AuthState | undefined, actions: AuthActions) {
    return _authReducer(state, actions);
}
