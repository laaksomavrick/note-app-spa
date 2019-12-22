import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap } from 'rxjs/operators';
import { AppStore } from '../../app.store';
import { isApiErrorResponse } from '../../http/http.helpers';
import { FoldersService } from '../../pages/dashboard/folders/folders.service';
import { NotesService } from '../../pages/dashboard/notes/notes.service';
import { getFoldersFailure, getFoldersSuccess } from '../folders/folders.actions';
import { GetFoldersSuccessResponse } from '../folders/folders.interfaces';
import {
    getNotesFailure,
    getNotesSuccess,
    setSelectedNote,
} from '../notes/notes.actions';
import { GetNotesSuccessResponse } from '../notes/notes.interfaces';
import { appBootAttempt, appBootSuccess } from './dashboard.actions';
import { AppBootProps } from './dashboard.interfaces';

// TODO dry; fixup

@Injectable()
export class DashboardEffects {
    @Effect({ dispatch: true })
    public appBoot$ = this.actions$.pipe(
        ofType(appBootAttempt.type),
        exhaustMap(async (props: AppBootProps) => {
            const folderId = props.folderId;
            const noteId = props.noteId;
            const dispatches = [];

            if (folderId && noteId) {
                const [folderResponse, noteResponse] = await Promise.all([
                    this.foldersService.getFolders(),
                    this.notesService.getNotes(folderId),
                ]);

                if (isApiErrorResponse(folderResponse)) {
                    dispatches.push(getFoldersFailure(folderResponse));
                }

                if (isApiErrorResponse(noteResponse)) {
                    dispatches.push(getNotesFailure(noteResponse));
                }

                if (dispatches.length > 0) {
                    // tslint:disable-next-line:typedef
                    dispatches.forEach(dispatch => this.store.dispatch(dispatch));
                } else {
                    dispatches.push(
                        getFoldersSuccess(folderResponse as GetFoldersSuccessResponse),
                        getNotesSuccess(noteResponse as GetNotesSuccessResponse),
                        setSelectedNote({ noteId }),
                    );
                }

                // tslint:disable-next-line:typedef
                dispatches.forEach(dispatch => this.store.dispatch(dispatch));

                if (folderId && noteId) {
                    await this.router.navigate(['folder', folderId, 'note', noteId]);
                }

                return appBootSuccess();
            } else if (folderId) {
                // tslint:disable-next-line:no-shadowed-variable
                let noteId;
                const [folderResponse, noteResponse] = await Promise.all([
                    this.foldersService.getFolders(),
                    this.notesService.getNotes(folderId),
                ]);

                if (isApiErrorResponse(folderResponse)) {
                    dispatches.push(getFoldersFailure(folderResponse));
                }

                if (isApiErrorResponse(noteResponse)) {
                    dispatches.push(getNotesFailure(noteResponse));
                } else {
                    const [firstNote] = noteResponse.resource.notes;
                    if (firstNote) {
                        noteId = firstNote.id;
                    }
                }

                if (dispatches.length > 0) {
                    // tslint:disable-next-line:typedef
                    dispatches.forEach(dispatch => this.store.dispatch(dispatch));
                } else {
                    dispatches.push(
                        getFoldersSuccess(folderResponse as GetFoldersSuccessResponse),
                        getNotesSuccess(noteResponse as GetNotesSuccessResponse),
                    );
                    if (noteId) {
                        dispatches.push(setSelectedNote({ noteId }));
                    }
                }

                // tslint:disable-next-line:typedef
                dispatches.forEach(dispatch => this.store.dispatch(dispatch));

                if (folderId && noteId) {
                    await this.router.navigate(['folder', folderId, 'note', noteId]);
                }

                return appBootSuccess();
            } else {
                // tslint:disable-next-line:no-shadowed-variable
                let noteId;
                // tslint:disable-next-line:no-shadowed-variable
                let folderId;

                const folderResponse = await this.foldersService.getFolders();

                if (isApiErrorResponse(folderResponse)) {
                    dispatches.push(getFoldersFailure(folderResponse));
                } else {
                    // TODO enforce always one folder
                    const [firstFolder] = folderResponse.resource.folders;
                    if (firstFolder) {
                        folderId = firstFolder.id;
                    }
                }

                const noteResponse = await this.notesService.getNotes(folderId as number);

                if (isApiErrorResponse(noteResponse)) {
                    dispatches.push(getNotesFailure(noteResponse));
                } else {
                    const [firstNote] = noteResponse.resource.notes;
                    if (firstNote) {
                        noteId = firstNote.id;
                    }
                }

                if (dispatches.length > 0) {
                    // tslint:disable-next-line:typedef
                    dispatches.forEach(dispatch => this.store.dispatch(dispatch));
                } else {
                    dispatches.push(
                        getFoldersSuccess(folderResponse as GetFoldersSuccessResponse),
                        getNotesSuccess(noteResponse as GetNotesSuccessResponse),
                    );
                    if (noteId) {
                        dispatches.push(setSelectedNote({ noteId }));
                    }
                }

                // tslint:disable-next-line:typedef
                dispatches.forEach(dispatch => this.store.dispatch(dispatch));

                if (folderId && noteId) {
                    await this.router.navigate(['folder', folderId, 'note', noteId]);
                }

                return appBootSuccess();
            }
        }),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly store: Store<AppStore>,
        private readonly foldersService: FoldersService,
        private readonly notesService: NotesService,
    ) {}
}
