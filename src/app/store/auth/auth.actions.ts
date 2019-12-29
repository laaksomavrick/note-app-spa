import { createAction, props } from "@ngrx/store";
import { AuthAttempt, AuthFailureResponse, AuthSuccessResponse } from "../../auth/auth.interfaces";

export const authSuccess = createAction("[Auth] Auth success", props<AuthSuccessResponse>());
export const authFailure = createAction("[Auth] Auth failure", props<AuthFailureResponse>());
export const authAttempt = createAction("[Auth] Auth attempt", props<AuthAttempt>());
export const authDismissError = createAction("[Auth] Auth dismiss error");

export type AuthActions =
    | ReturnType<typeof authSuccess>
    | ReturnType<typeof authFailure>
    | ReturnType<typeof authAttempt>
    | ReturnType<typeof authDismissError>;
