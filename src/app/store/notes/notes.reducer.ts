import { createReducer, on } from '@ngrx/store';
import { getHumanReadableApiError } from '../../http/http.helpers';
import { ApiErrorResponse } from '../../http/http.interfaces';
import {
    getNotesAttempt,
    getNotesFailure,
    getNotesSuccess,
    NoteActions,
    setSelectedNote,
    updateNoteAttempt,
    updateNoteFailure,
    updateNoteSuccess,
} from './notes.actions';
import {
    GetNotesSuccessResponse,
    Note,
    SetSelectedNoteProps,
    UpdateNoteAttemptProps,
    UpdateNoteSuccessResponse,
} from './notes.interfaces';

export interface NotesToFolderMapping {
    [noteId: string]: Note[];
}

export interface NotesState {
    // notesToFolderMapping: NotesToFolderMapping;
    notes: Note[];
    selectedNote?: Note;
    loading: boolean;
    error?: string;

    updateNoteLoading: boolean;
    updateNoteError?: string;
}

export const initialState: NotesState = {
    // notesToFolderMapping: {},
    notes: [],
    selectedNote: undefined,
    loading: false,
    error: undefined,

    updateNoteLoading: false,
    updateNoteError: undefined,
};

const _noteReducer = createReducer<NotesState, NoteActions>(
    initialState,
    on(
        setSelectedNote,
        (state: NotesState, props: SetSelectedNoteProps): NotesState => ({
            ...state,
            selectedNote: props.noteId
                ? state.notes.find((note: Note) => note.id === props.noteId)
                : undefined,
        }),
    ),

    on(
        getNotesSuccess,
        (state: NotesState, props: GetNotesSuccessResponse): NotesState => {
            // TODO: needs to change if ?folderId= is not specified for whatever reason
            // in the future (i.e. all notes view)
            // let folderId;
            // const [note] = props.resource.notes;
            //
            // if (note) {
            //     folderId = note.folderId;
            // }

            return {
                ...state,
                // notesToFolderMapping: {
                //     ...state.notesToFolderMapping,
                //     [`${folderId}`]: props.resource.notes,
                // },
                notes: props.resource.notes,
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

    on(
        updateNoteSuccess,
        (state: NotesState, props: UpdateNoteSuccessResponse): NotesState => {
            const notes = state.notes.map((note: Note) => {
                if (note.id === props.resource.note.id) {
                    return props.resource.note;
                } else {
                    return note;
                }
            });
            return {
                ...state,
                updateNoteError: undefined,
                updateNoteLoading: false,
                notes,
            };
        },
    ),
    on(
        updateNoteFailure,
        (state: NotesState, props: ApiErrorResponse): NotesState => ({
            ...state,
            updateNoteError: getHumanReadableApiError(props),
        }),
    ),
    on(
        updateNoteAttempt,
        (state: NotesState, props: UpdateNoteAttemptProps): NotesState => ({
            ...state,
            updateNoteLoading: true,
        }),
    ),
);

// tslint:disable-next-line:typedef
export function noteReducer(state: NotesState | undefined, actions: NoteActions) {
    return _noteReducer(state, actions);
}
