import { createAction, props } from "@ngrx/store";
import { ApiErrorResponse } from "../../http/http.interfaces";
import { SearchAllSuccessResponse, SearchProps } from "./search.interfaces";

export const searchAllSuccess = createAction(
    "[Search] Search all success",
    props<SearchAllSuccessResponse>(),
);
export const searchAllFailure = createAction(
    "[Search] Search all failure",
    props<ApiErrorResponse>(),
);
export const searchAllAttempt = createAction("[Search] Search all attempt", props<SearchProps>());

export type SearchActions =
    | ReturnType<typeof searchAllSuccess>
    | ReturnType<typeof searchAllFailure>
    | ReturnType<typeof searchAllAttempt>;
