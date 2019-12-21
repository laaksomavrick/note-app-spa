import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { isApiErrorResponse } from '../../http/http.helpers';
import { NotesService } from '../../pages/dashboard/notes/notes.service';
import { getNotesAttempt, getNotesFailure, getNotesSuccess } from './notes.actions';
import { GetNotesAttemptProps } from './notes.interfaces';

@Injectable()
export class NotesEffects {
    public getNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getNotesAttempt.type),
            switchMap(async (props: GetNotesAttemptProps) => {
                try {
                    const response = await this.notesService.getNotes(props.folderId);
                    if (isApiErrorResponse(response)) {
                        return getNotesFailure(response);
                    }

                    if (props.noteId) {
                        const folderId = props.folderId;
                        const noteId = props.noteId;
                        console.log('here');
                        await this.router.navigate(['folder', folderId, 'note', noteId]);
                    }

                    return getNotesSuccess(response);
                } catch (e) {
                    return getNotesFailure(e);
                }
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly notesService: NotesService,
        private readonly router: Router,
    ) {}
}
