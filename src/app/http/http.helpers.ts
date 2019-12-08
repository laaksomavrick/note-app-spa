import { ApiErrorResponse } from './http.interfaces';

// const NOT_FOUND = 404;
// const CONFLICT = 409;
// const MALFORMED = 400;
// const INVALID = 422;
// const FORIBDDEN = 403;
// const UNAUTHORIZED = 401;

export function getHumanReadableApiError(err: ApiErrorResponse): string {
    // TODO
    return err.error.msg;
}
