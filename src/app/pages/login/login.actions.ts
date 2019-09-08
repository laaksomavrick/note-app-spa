import { createAction, props } from '@ngrx/store';
import { LoginAttempt } from './loginAttempt';
import { LoginResponse } from './loginResponse';

export const loginSuccess = createAction('[Login] Login success', props<LoginResponse>());
export const loginFailure = createAction('[Login] Login failure', props<LoginResponse>());
export const loginAttempt = createAction('[Login] Login attempt', props<LoginAttempt>());
