import { createAction, props } from '@ngrx/store';
import { ApiErrorResponse } from '../../http/http.interfaces';
import { GetFoldersSuccessResponse } from '../../pages/dashboard/folders/folders.interfaces';

export const getFoldersSuccess = createAction('[Folders] Get folders success', props<GetFoldersSuccessResponse>());
export const getFoldersFailure = createAction('[Folders] Get folders failure', props<ApiErrorResponse>());
export const getFoldersAttempt = createAction('[Folders] Get folders attempt');

export type FolderActions =
    ReturnType<typeof getFoldersSuccess>
    | ReturnType<typeof getFoldersFailure>
    | ReturnType<typeof getFoldersAttempt>;
