import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators';
import { isApiErrorResponse } from '../../http/http.helpers';
import { FoldersService } from '../../pages/dashboard/folders/folders.service';
import {
    createFoldersAttempt,
    createFoldersFailure,
    createFoldersSuccess,
    getFoldersAttempt,
    getFoldersFailure,
    getFoldersSuccess,
} from './folders.actions';
import { CreateFolderAttemptProps, GetFolderAttemptProps } from './folders.interfaces';

@Injectable()
export class FoldersEffects {
    public getFolders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getFoldersAttempt.type),
            exhaustMap(async (props: GetFolderAttemptProps) => {
                try {
                    const response = await this.folderService.getFolders();
                    if (isApiErrorResponse(response)) {
                        return getFoldersFailure(response);
                    }
                    // TODO handle this better
                    // TODO guarantee always one folder from backend

                    let folderId;

                    if (props.folderId) {
                        // Assumption: all folders for a user are being loaded
                        folderId = props.folderId;
                    } else {
                        const [firstFolder] = response.resource.folders;
                        folderId = firstFolder.id;
                        await this.router.navigate(['/folder', folderId]);
                    }

                    return getFoldersSuccess(response);
                } catch (e) {
                    return getFoldersFailure(e);
                }
            }),
        ),
    );

    public createFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createFoldersAttempt),
            exhaustMap(async (props: CreateFolderAttemptProps) => {
                try {
                    const response = await this.folderService.createFolder(props.name);

                    if (isApiErrorResponse(response)) {
                        return createFoldersFailure(response);
                    }

                    return createFoldersSuccess(response);
                } catch (e) {
                    return createFoldersFailure(e);
                }
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly folderService: FoldersService,
    ) {}
}
