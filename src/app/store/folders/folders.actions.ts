import { createAction, props } from '@ngrx/store';
import { ApiErrorResponse } from '../../http/http.interfaces';
import {
    CreateFolderAttemptProps,
    CreateFolderSuccessResponse,
    GetFolderAttemptProps,
    GetFoldersSuccessResponse,
} from './folders.interfaces';

export const getFoldersSuccess = createAction(
    '[Folders] Get folders success',
    props<GetFoldersSuccessResponse>(),
);
export const getFoldersFailure = createAction(
    '[Folders] Get folders failure',
    props<ApiErrorResponse>(),
);
export const getFoldersAttempt = createAction(
    '[Folders] Get folders attempt',
    props<GetFolderAttemptProps>(),
);

export const toggleCreateFolderVisible = createAction(
    '[Folders] Toogle create folder visible',
);

export const createFoldersSuccess = createAction(
    '[Folders] Create folders success',
    props<CreateFolderSuccessResponse>(),
);
export const createFoldersFailure = createAction(
    '[Folders] Create folders failure',
    props<ApiErrorResponse>(),
);
export const createFoldersAttempt = createAction(
    '[Folders] Create folders attempt',
    props<CreateFolderAttemptProps>(),
);
export type FolderActions =
    | ReturnType<typeof getFoldersSuccess>
    | ReturnType<typeof getFoldersFailure>
    | ReturnType<typeof getFoldersAttempt>
    | ReturnType<typeof toggleCreateFolderVisible>
    | ReturnType<typeof createFoldersSuccess>
    | ReturnType<typeof createFoldersFailure>
    | ReturnType<typeof createFoldersAttempt>;
