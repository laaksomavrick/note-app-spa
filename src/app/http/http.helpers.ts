import { ApiErrorResponse } from "./http.interfaces";

// const NOT_FOUND = 404;
// const CONFLICT = 409;
// const MALFORMED = 400;
// const INVALID = 422;
// const FORIBDDEN = 403;
// const UNAUTHORIZED = 401;

export function getHumanReadableApiError(err: ApiErrorResponse): string {
    if (err && err.error && err.error.msg) {
        return err.error.msg;
    }

    return "Oops! Something went wrong";
}

// tslint:disable-next-line:no-any
export function isApiErrorResponse(maybe: any): maybe is ApiErrorResponse {
    return maybe.error != null;
}
