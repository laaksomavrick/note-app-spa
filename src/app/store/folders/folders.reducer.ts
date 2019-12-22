import { createReducer, on } from '@ngrx/store';
import { getHumanReadableApiError } from '../../http/http.helpers';
import { ApiErrorResponse } from '../../http/http.interfaces';
import {
    createFoldersAttempt,
    createFoldersFailure,
    createFoldersSuccess,
    FolderActions,
    getFoldersAttempt,
    getFoldersFailure,
    getFoldersSuccess,
    toggleCreateFolderVisible,
} from './folders.actions';
import {
    CreateFolderSuccessResponse,
    Folder,
    GetFoldersSuccessResponse,
} from './folders.interfaces';

export interface FoldersState {
    folders: Folder[];
    loading: boolean;
    error: string | undefined;

    createFolderVisible: boolean;
    createFolderLoading: boolean;
    createFolderError: string | undefined;
}

export const initialState: FoldersState = {
    folders: [],
    loading: false,
    error: undefined,

    createFolderVisible: false,
    createFolderLoading: false,
    createFolderError: undefined,
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
    on(
        getFoldersAttempt,
        (state: FoldersState): FoldersState => ({ ...state, loading: true }),
    ),

    on(
        toggleCreateFolderVisible,
        (state: FoldersState): FoldersState => ({
            ...state,
            createFolderVisible: !state.createFolderVisible,
        }),
    ),

    on(
        createFoldersSuccess,
        (state: FoldersState, props: CreateFolderSuccessResponse): FoldersState => {
            return {
                ...state,
                folders: [...state.folders, props.resource.folder],
                createFolderError: undefined,
                createFolderLoading: false,
                createFolderVisible: false,
            };
        },
    ),
    on(
        createFoldersFailure,
        (state: FoldersState, props: ApiErrorResponse): FoldersState => ({
            ...state,
            createFolderLoading: false,
            createFolderError: getHumanReadableApiError(props),
            createFolderVisible: false,
        }),
    ),
    on(
        createFoldersAttempt,
        (state: FoldersState): FoldersState => ({ ...state, createFolderLoading: true }),
    ),
);

// tslint:disable-next-line:typedef
export function folderReducer(state: FoldersState | undefined, actions: FolderActions) {
    return _folderReducer(state, actions);
}
