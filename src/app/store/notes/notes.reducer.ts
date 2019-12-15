import { createReducer, on } from '@ngrx/store';
import { getHumanReadableApiError } from '../../http/http.helpers';
import { ApiErrorResponse } from '../../http/http.interfaces';
import {
    getNotesAttempt,
    getNotesFailure,
    getNotesSuccess,
    NoteActions,
} from './notes.actions';
import { GetNotesSuccessResponse, Note } from './notes.interfaces';

export interface NotesToFolderMapping {
    [noteId: string]: Note[];
}

export interface NotesState {
    notesToFolderMapping: NotesToFolderMapping;
    loading: boolean;
    error?: string;
}

export const initialState: NotesState = {
    notesToFolderMapping: {},
    loading: false,
    error: undefined,
};

const _noteReducer = createReducer<NotesState, NoteActions>(
    initialState,
    on(
        getNotesSuccess,
        (state: NotesState, props: GetNotesSuccessResponse): NotesState => {
            // TODO: needs to change if ?folderId= is not specified for whatever reason
            // in the future (i.e. all notes view)
            let folderId;
            const [note] = props.resource.notes;

            if (note) {
                folderId = note.folderId;
            }

            return {
                ...state,
                notesToFolderMapping: {
                    ...state.notesToFolderMapping,
                    [`${folderId}`]: props.resource.notes,
                },
                loading: false,
                error: undefined,
            };
        },
    ),
    on(
        getNotesFailure,
        (state: NotesState, props: ApiErrorResponse): NotesState => ({
            ...state,
            loading: false,
            error: getHumanReadableApiError(props),
        }),
    ),
    on(getNotesAttempt, (state: NotesState): NotesState => ({ ...state, loading: true })),
);

// tslint:disable-next-line:typedef
export function noteReducer(state: NotesState | undefined, actions: NoteActions) {
    return _noteReducer(state, actions);
}
