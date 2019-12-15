import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { isApiErrorResponse } from '../../http/http.helpers';
import { ApiErrorResponse } from '../../http/http.interfaces';
import { NotesService } from '../../pages/dashboard/notes/notes.service';
import { getNotesAttempt, getNotesFailure, getNotesSuccess } from './notes.actions';
import { GetNotesAttemptProps, GetNotesSuccessResponse } from './notes.interfaces';

@Injectable()
export class NotesEffects {
    public getNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getNotesAttempt.type),
            exhaustMap((props: GetNotesAttemptProps) =>
                this.notesService.getNotes(props.folderId).pipe(
                    map(
                        (
                            getNotesResponse: GetNotesSuccessResponse | ApiErrorResponse,
                        ) => {
                            if (isApiErrorResponse(getNotesResponse)) {
                                return getNotesFailure(getNotesResponse);
                            }
                            return getNotesSuccess(getNotesResponse);
                        },
                    ),
                    // tslint:disable-next-line:typedef
                    catchError(({ error }) => {
                        return of(getNotesFailure(error));
                    }),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly notesService: NotesService,
    ) {}
}
