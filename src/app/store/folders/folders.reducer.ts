import { createReducer, on } from '@ngrx/store';
import { AuthFailureResponse, AuthSuccessResponse } from '../../auth/auth.interfaces';
import { getHumanReadableApiError } from '../../http/http.helpers';
import { ApiErrorResponse } from '../../http/http.interfaces';
import { Folder, GetFoldersSuccessResponse } from '../../pages/dashboard/folders/folders.interfaces';
import { FolderActions, getFoldersAttempt, getFoldersFailure, getFoldersSuccess } from './folders.actions';

export interface FoldersState {
    folders: Folder[];
    loading: boolean;
    error: string | undefined;
}

export const initialState: FoldersState = {
    folders: [],
    loading: false,
    error: undefined,
};

export const _folderReducer = createReducer<FoldersState, FolderActions>(
    initialState,
    on(
        getFoldersSuccess,
        (state: FoldersState, props: GetFoldersSuccessResponse): FoldersState => {
            return {
                ...state,
                folders: props.resource.folders,
                loading: false,
                error: undefined,
            };
        },
    ),
    on(
        getFoldersFailure,
        (state: FoldersState, props: ApiErrorResponse): FoldersState => ({
            ...state,
            loading: false,
            error: getHumanReadableApiError(props),
        }),
    ),
    on(getFoldersAttempt, (state: FoldersState): FoldersState => ({ ...state, loading: true })),
);

// tslint:disable-next-line:typedef
export function folderReducer(state: FoldersState | undefined, actions: FolderActions) {
    return _folderReducer(state, actions);
}
