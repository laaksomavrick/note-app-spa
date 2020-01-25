import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, tap } from "rxjs/operators";
import { isApiErrorResponse } from "../../http/http.helpers";
// tslint:disable-next-line:max-line-length
import { CreateFolderModalComponent } from "../../pages/dashboard/folders/create-folder-modal/create-folder-modal.component";
import { FoldersService } from "../../pages/dashboard/folders/folders.service";
import {
    createFoldersAttempt,
    createFoldersFailure,
    createFoldersSuccess,
    deleteFoldersAttempt,
    deleteFoldersFailure,
    deleteFoldersSuccess,
    getFoldersAttempt,
    getFoldersFailure,
    getFoldersSuccess,
    toggleCreateFolderVisible,
} from "./folders.actions";
import {
    CreateFolderAttemptProps,
    DeleteFolderAttemptProps,
    GetFolderAttemptProps,
} from "./folders.interfaces";

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
                        await this.router.navigate(["/folder", folderId]);
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

    public deleteFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteFoldersAttempt),
            exhaustMap(async (props: DeleteFolderAttemptProps) => {
                try {
                    const response = await this.folderService.deleteFolder(props.folderId);

                    if (isApiErrorResponse(response)) {
                        return deleteFoldersFailure(response);
                    }

                    return deleteFoldersSuccess({ folderId: props.folderId });
                } catch (e) {
                    return deleteFoldersFailure(e);
                }
            }),
        ),
    );

    public toggleCreateFolderVisible$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(toggleCreateFolderVisible),
                tap(() => {
                    const open = this.modalService.hasOpenModals();
                    if (open) {
                        this.modalService.dismissAll();
                    } else {
                        this.modalService.open(CreateFolderModalComponent);
                    }
                }),
            ),
        { dispatch: false },
    );

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly folderService: FoldersService,
        private readonly modalService: NgbModal,
    ) {}
}
