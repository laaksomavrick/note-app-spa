import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { isApiErrorResponse } from '../../http/http.helpers';
import { ApiErrorResponse } from '../../http/http.interfaces';
import { GetFoldersSuccessResponse } from '../../pages/dashboard/folders/folders.interfaces';
import { FoldersService } from '../../pages/dashboard/folders/folders.service';
import { getFoldersAttempt, getFoldersFailure, getFoldersSuccess } from './folders.actions';

@Injectable()
export class FoldersEffects {
    public getFolders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getFoldersAttempt.type),
            exhaustMap(() =>
                this.folderService.getFolders().pipe(
                    map((getFoldersResponse: GetFoldersSuccessResponse | ApiErrorResponse) => {
                        if (isApiErrorResponse(getFoldersResponse)) {
                            return getFoldersFailure(getFoldersResponse);
                        }
                        return getFoldersSuccess(getFoldersResponse);
                    }),
                    // tslint:disable-next-line:typedef
                    catchError(({ error }) => {
                        return of(getFoldersFailure(error));
                    }),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly folderService: FoldersService,
    ) {}
}
