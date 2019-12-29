import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap } from "rxjs/operators";
import { isApiErrorResponse } from "../../http/http.helpers";
import { NotesService } from "../../pages/dashboard/notes/notes.service";
import {
    deleteFoldersAttempt,
    deleteFoldersFailure,
    deleteFoldersSuccess,
} from "../folders/folders.actions";
import { DeleteFolderAttemptProps } from "../folders/folders.interfaces";
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
    updateNoteAttempt,
    updateNoteFailure,
    updateNoteSuccess,
} from "./notes.actions";
import {
    CreateNoteAttemptProps,
    DeleteNoteAttemptProps,
    GetNotesAttemptProps,
    UpdateNoteAttemptProps,
} from "./notes.interfaces";

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

                    return getNotesSuccess(response);
                } catch (e) {
                    return getNotesFailure(e);
                }
            }),
        ),
    );

    public updateNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateNoteAttempt),
            exhaustMap(async (props: UpdateNoteAttemptProps) => {
                try {
                    const response = await this.notesService.updateNote(props);

                    if (isApiErrorResponse(response)) {
                        return updateNoteFailure(response);
                    }

                    return updateNoteSuccess(response);
                } catch (e) {
                    return updateNoteFailure(e);
                }
            }),
        ),
    );

    public createNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createNoteAttempt),
            exhaustMap(async (props: CreateNoteAttemptProps) => {
                try {
                    const response = await this.notesService.createNote(props);

                    if (isApiErrorResponse(response)) {
                        return createNoteFailure(response);
                    }

                    return createNoteSuccess(response);
                } catch (e) {
                    return createNoteFailure(e);
                }
            }),
        ),
    );

    public deleteNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteNoteAttempt),
            exhaustMap(async (props: DeleteNoteAttemptProps) => {
                try {
                    const response = await this.notesService.deleteNote(props.noteId);

                    if (isApiErrorResponse(response)) {
                        return deleteNoteFailure(response);
                    }

                    return deleteNoteSuccess({ noteId: props.noteId });
                } catch (e) {
                    return deleteNoteFailure(e);
                }
            }),
        ),
    );

    constructor(private readonly actions$: Actions, private readonly notesService: NotesService) {}
}
