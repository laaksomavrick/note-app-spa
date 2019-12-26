import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../../app.store';
import { deleteFoldersAttempt } from '../../../store/folders/folders.actions';
import { toggleCreateNoteVisible } from '../../../store/notes/notes.actions';
import { RouterService } from '../router.service';

enum DeleteButtonIds {
    DeleteButton = 'deleteButton',
    DeleteButtonAreYouSure = 'deleteButtonAreYouSure',
}

// TODO: inactive/active toggle state
// e.g., if only 1 folder exists, can't delete it
// if nothing selected, can't delete nothing

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
    public noteSaving$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.updateNoteLoading,
    );

    public deleteAreYouSure = false;

    private deleteClickAwayFn?: () => void;

    constructor(
        private readonly store: Store<AppStore>,
        private readonly routerService: RouterService,
        private readonly renderer: Renderer2,
    ) {}

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        if (this.deleteClickAwayFn) {
            this.deleteClickAwayFn();
        }
    }

    public onClickNew(): void {
        const maybeFolderId = this.routerService.getFolderIdFromRoute();

        if (maybeFolderId) {
            this.store.dispatch(toggleCreateNoteVisible());
        }
    }

    public toggleDeleteAreYouSureOn(): void {
        this.deleteAreYouSure = true;
        this.deleteClickAwayFn = this.renderer.listen('document', 'click', (e: Event) => {
            if (!e.target) {
                return;
            }

            // TODO hack
            // tslint:disable-next-line:no-any
            const id = (e.target as any).id;

            if (
                id !== DeleteButtonIds.DeleteButton &&
                id !== DeleteButtonIds.DeleteButtonAreYouSure
            ) {
                this.toggleDeleteAreYouSureOff();
            }
        });
    }

    public toggleDeleteAreYouSureOff(): void {
        if (this.deleteClickAwayFn) {
            this.deleteClickAwayFn();
        }

        this.deleteAreYouSure = false;
    }

    public onClickDelete(): void {
        const maybeFolderId = this.routerService.getFolderIdFromRoute();
        const maybeNoteId = this.routerService.getNoteIdFromRoute();

        if (maybeNoteId) {
            console.log('TODO: delete note');
        } else if (maybeFolderId) {
            this.store.dispatch(deleteFoldersAttempt({ folderId: maybeFolderId }));
        }

        this.toggleDeleteAreYouSureOff();
    }
}
