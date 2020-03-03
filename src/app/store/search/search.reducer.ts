import { createReducer, on } from "@ngrx/store";
import { getHumanReadableApiError } from "../../http/http.helpers";
import { ApiErrorResponse } from "../../http/http.interfaces";
import { Folder } from "../folders/folders.interfaces";
import { Note } from "../notes/notes.interfaces";
import {
    SearchActions,
    searchAllAttempt,
    searchAllFailure,
    searchAllSuccess,
} from "./search.actions";
import { SearchAllSuccessResponse } from "./search.interfaces";

export interface SearchState {
    results: {
        notes: Note[];
        folders: Folder[];
    };
    loading: boolean;
    error: string | undefined;
}

export const initialState: SearchState = {
    results: {
        notes: [],
        folders: [],
    },
    loading: false,
    error: undefined,
};

export const _searchReducer = createReducer<SearchState, SearchActions>(
    initialState,
    on(
        searchAllSuccess,
        (state: SearchState, props: SearchAllSuccessResponse): SearchState => {
            return {
                ...state,
                results: {
                    notes: props.resource.notes,
                    folders: props.resource.folders,
                },
                loading: false,
                error: undefined,
            };
        },
    ),
    on(
        searchAllFailure,
        (state: SearchState, props: ApiErrorResponse): SearchState => ({
            ...state,
            loading: false,
            error: getHumanReadableApiError(props),
        }),
    ),
    on(searchAllAttempt, (state: SearchState): SearchState => ({ ...state, loading: true })),
);

// tslint:disable-next-line:typedef
export function searchReducer(state: SearchState | undefined, actions: SearchActions) {
    return _searchReducer(state, actions);
}
