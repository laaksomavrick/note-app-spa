import { ActionReducerMap } from '@ngrx/store';
import { AuthActions } from './store/auth/auth.actions';
import { authReducer, AuthState } from './store/auth/auth.reducer';

export interface AppStore {
    authState: AuthState;
}

export type AppActions = AuthActions;

export const appStore: ActionReducerMap<
    {
        authState: ReturnType<typeof authReducer>;
    },
    AppActions
    > = {
    authState: authReducer,
};
