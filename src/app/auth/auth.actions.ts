import { createAction, props } from '@ngrx/store';
import { AuthAttempt, AuthResponse } from './auth.interfaces';

export const authSuccess = createAction('[Auth] Auth success', props<AuthResponse>());
export const authFailure = createAction('[Auth] Auth failure', props<AuthResponse>());
export const authAttempt = createAction('[Auth] Auth attempt', props<AuthAttempt>());
