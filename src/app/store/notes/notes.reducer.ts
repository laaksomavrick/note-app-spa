import { createReducer, on } from '@ngrx/store';
import { getHumanReadableApiError } from '../../http/http.helpers';
import { ApiErrorResponse } from '../../http/http.interfaces';
import {
    createNoteAttempt,
    createNoteFailure,
    createNoteSuccess,
    getNotesAttempt,
    getNotesFailure,
    getNotesSuccess,
    NoteActions,
    setSelectedNote,
    toggleCreateNoteVisible,
    updateNoteAttempt,
    updateNoteFailure,
    updateNoteSuccess,
} from './notes.actions';
import {
    CreateNoteAttemptProps,
    CreateNoteSuccessResponse,
    GetNotesSuccessResponse,
    Note,
    SetSelectedNoteProps,
    UpdateNoteAttemptProps,
    UpdateNoteSuccessResponse,
} from './notes.interfaces';

export interface NotesState {
    notes: Note[];
    selectedNote?: Note;
    loading: boolean;
    error?: string;

    updateNoteLoading: boolean;
    updateNoteError?: string;

    createNoteVisible: boolean;
    createNoteLoading: boolean;
    createNoteError?: string;
}

export const initialState: NotesState = {
    notes: [],
    selectedNote: undefined,
    loading: false,
    error: undefined,

    updateNoteLoading: false,
    updateNoteError: undefined,

    createNoteVisible: false,
    createNoteLoading: false,
    createNoteError: undefined,
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
            return {
                ...state,
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

    on(
        toggleCreateNoteVisible,
        (state: NotesState): NotesState => ({
            ...state,
            createNoteVisible: !state.createNoteVisible,
        }),
    ),

    on(
        createNoteSuccess,
        (state: NotesState, props: CreateNoteSuccessResponse): NotesState => {
            const notes = [...state.notes, props.resource.note];
            return {
                ...state,
                createNoteError: undefined,
                createNoteLoading: false,
                createNoteVisible: false,
                notes,
            };
        },
    ),
    on(
        createNoteFailure,
        (state: NotesState, props: ApiErrorResponse): NotesState => ({
            ...state,
            createNoteError: getHumanReadableApiError(props),
        }),
    ),
    on(
        createNoteAttempt,
        (state: NotesState, props: CreateNoteAttemptProps): NotesState => ({
            ...state,
            createNoteLoading: true,
        }),
    ),
);

// tslint:disable-next-line:typedef
export function noteReducer(state: NotesState | undefined, actions: NoteActions) {
    return _noteReducer(state, actions);
}
