import { ActionReducerMap } from '@ngrx/store';
import { AuthActions } from './store/auth/auth.actions';
import { authReducer, AuthState } from './store/auth/auth.reducer';
import { FolderActions } from './store/folders/folders.actions';
import { folderReducer, FoldersState } from './store/folders/folders.reducer';

export interface AppStore {
    authState: AuthState;
    foldersState: FoldersState;
}

export type AppActions = AuthActions & FolderActions;

export const appStore: ActionReducerMap<
    {
        authState: ReturnType<typeof authReducer>;
        foldersState: ReturnType<typeof folderReducer>;
    },
    AppActions
    > = {
    authState: authReducer,
    foldersState: folderReducer,
};
