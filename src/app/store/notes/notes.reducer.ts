import { createReducer, on } from "@ngrx/store";
import { getHumanReadableApiError } from "../../http/http.helpers";
import { ApiErrorResponse } from "../../http/http.interfaces";
import {
    NOTE_ORDER_BY_DEFAULT,
    NoteOrderByParams,
} from "../../pages/dashboard/notes/notes.service";
import {
    createNoteAttempt,
    createNoteFailure,
    createNoteSuccess,
    deleteNoteAttempt,
    deleteNoteFailure,
    deleteNoteSuccess,
    getNotesAttempt,
    getNotesFailure,
    getNotesSuccess,
    NoteActions,
    setNoteOrderBy,
    setSelectedNote,
    toggleCreateNoteVisible,
    updateNoteAttempt,
    updateNoteFailure,
    updateNoteSuccess,
} from "./notes.actions";
import {
    CreateNoteAttemptProps,
    CreateNoteSuccessResponse,
    DeleteNoteAttemptProps,
    DeleteNoteSuccessResponse,
    GetNotesSuccessResponse,
    Note,
    SetNoteOrderByProps,
    SetSelectedNoteProps,
    UpdateNoteAttemptProps,
    UpdateNoteSuccessResponse,
} from "./notes.interfaces";

const notesSortFn = (notes: Note[], noteOrderBy: NoteOrderByParams): Note[] =>
    notes.sort((a: Note, b: Note): number => {
        if (noteOrderBy === NoteOrderByParams.UpdatedAt) {
            return a.updatedAt > b.updatedAt ? -1 : 1;
        } else if (noteOrderBy === NoteOrderByParams.CreatedAt) {
            return a.createdAt > b.createdAt ? -1 : 1;
        } else {
            return 1;
        }
    });

export interface NotesState {
    notes: Note[];
    noteOrderBy: NoteOrderByParams;
    selectedNote?: Note;
    loading: boolean;
    error?: string;

    updateNoteLoading: boolean;
    updateNoteError?: string;

    createNoteVisible: boolean;
    createNoteLoading: boolean;
    createNoteError?: string;

    deleteNoteLoading: boolean;
    deleteNoteError?: string;
}

export const initialState: NotesState = {
    notes: [],
    noteOrderBy: NOTE_ORDER_BY_DEFAULT,
    selectedNote: undefined,
    loading: false,
    error: undefined,

    updateNoteLoading: false,
    updateNoteError: undefined,

    createNoteVisible: false,
    createNoteLoading: false,
    createNoteError: undefined,

    deleteNoteLoading: false,
    deleteNoteError: undefined,
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
            let notes = state.notes.map((note: Note) => {
                if (note.id === props.resource.note.id) {
                    return props.resource.note;
                } else {
                    return note;
                }
            });
            notes = notesSortFn(notes, state.noteOrderBy);
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
            let notes = [...state.notes, props.resource.note];
            notes = notesSortFn(notes, state.noteOrderBy);
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
            createNoteLoading: false,
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

    on(
        deleteNoteSuccess,
        (state: NotesState, props: DeleteNoteSuccessResponse): NotesState => {
            const notes = state.notes.filter((note: Note) => note.id !== props.noteId);
            return {
                ...state,
                notes,
                deleteNoteError: undefined,
                deleteNoteLoading: false,
            };
        },
    ),
    on(
        deleteNoteFailure,
        (state: NotesState, props: ApiErrorResponse): NotesState => ({
            ...state,
            deleteNoteLoading: false,
            deleteNoteError: getHumanReadableApiError(props),
        }),
    ),
    on(
        deleteNoteAttempt,
        (state: NotesState, props: DeleteNoteAttemptProps): NotesState => ({
            ...state,
            deleteNoteError: undefined,
            deleteNoteLoading: true,
        }),
    ),

    on(
        setNoteOrderBy,
        (state: NotesState, props: SetNoteOrderByProps): NotesState => ({
            ...state,
            noteOrderBy: props.orderBy,
        }),
    ),
);

// tslint:disable-next-line:typedef
export function noteReducer(state: NotesState | undefined, actions: NoteActions) {
    return _noteReducer(state, actions);
}
