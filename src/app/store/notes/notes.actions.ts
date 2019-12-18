import { createAction, props } from '@ngrx/store';
import { ApiErrorResponse } from '../../http/http.interfaces';
import {
    GetNotesAttemptProps,
    GetNotesSuccessResponse,
    SetSelectedNoteProps,
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

export type NoteActions =
    | ReturnType<typeof getNotesSuccess>
    | ReturnType<typeof getNotesFailure>
    | ReturnType<typeof getNotesAttempt>
    | ReturnType<typeof setSelectedNote>;
