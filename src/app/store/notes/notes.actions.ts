import { createAction, props } from '@ngrx/store';
import { ApiErrorResponse } from '../../http/http.interfaces';
import {
    CreateNoteAttemptProps,
    CreateNoteSuccessResponse,
    GetNotesAttemptProps,
    GetNotesSuccessResponse,
    SetSelectedNoteProps,
    UpdateNoteAttemptProps,
    UpdateNoteSuccessResponse,
} from './notes.interfaces';

export const getNotesSuccess = createAction(
    '[Notes] Get notes success',
    props<GetNotesSuccessResponse>(),
);
export const getNotesFailure = createAction(
    '[Notes] Get notes failure',
    props<ApiErrorResponse>(),
);
export const getNotesAttempt = createAction(
    '[Notes] Get notes attempt',
    props<GetNotesAttemptProps>(),
);

export const setSelectedNote = createAction(
    '[Notes] Set selected note',
    props<SetSelectedNoteProps>(),
);

export const updateNoteSuccess = createAction(
    '[Notes] Update note success',
    props<UpdateNoteSuccessResponse>(),
);
export const updateNoteFailure = createAction(
    '[Notes] Update note failure',
    props<ApiErrorResponse>(),
);
export const updateNoteAttempt = createAction(
    '[Notes] Update note attempt',
    props<UpdateNoteAttemptProps>(),
);

export const toggleCreateNoteVisible = createAction('[Notes] Toogle create note visible');

export const createNoteSuccess = createAction(
    '[Notes] Create note success',
    props<CreateNoteSuccessResponse>(),
);
export const createNoteFailure = createAction(
    '[Notes] Create note failure',
    props<ApiErrorResponse>(),
);
export const createNoteAttempt = createAction(
    '[Notes] Create note attempt',
    props<CreateNoteAttemptProps>(),
);

export type NoteActions =
    | ReturnType<typeof getNotesSuccess>
    | ReturnType<typeof getNotesFailure>
    | ReturnType<typeof getNotesAttempt>
    | ReturnType<typeof setSelectedNote>
    | ReturnType<typeof updateNoteSuccess>
    | ReturnType<typeof updateNoteFailure>
    | ReturnType<typeof updateNoteAttempt>
    | ReturnType<typeof toggleCreateNoteVisible>
    | ReturnType<typeof createNoteSuccess>
    | ReturnType<typeof createNoteFailure>
    | ReturnType<typeof createNoteAttempt>;
