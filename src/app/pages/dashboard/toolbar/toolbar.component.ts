import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppStore } from "../../../app.store";
import { getNotesAttempt, setNoteOrderBy } from "../../../store/notes/notes.actions";
import { NoteOrderByParams } from "../notes/notes.service";

@Component({
    selector: "app-toolbar",
    templateUrl: "./toolbar.component.html",
    styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent {
    public noteSaving$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.updateNoteLoading,
    );

    public currentNoteOrderBy$: Observable<NoteOrderByParams> = this.store.select(
        ({ notesState }: AppStore) => notesState.noteOrderBy,
    );

    public selectedFolderId$: Observable<number | undefined> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.selectedFolderId,
    );

    constructor(private readonly store: Store<AppStore>) {}

    public async onSortClick(newOrder: NoteOrderByParams): Promise<void> {
        const folderId = await this.selectedFolderId$.pipe(take(1)).toPromise();

        if (!folderId) {
            console.warn("No folder id found for onSortClick");
            return;
        }
        this.store.dispatch(setNoteOrderBy({ orderBy: newOrder }));
        this.store.dispatch(getNotesAttempt({ folderId, orderBy: newOrder }));
    }

    // public onClickDelete(): void {
    //     const maybeFolderId = this.routerService.getFolderIdFromRoute();
    //     const maybeNoteId = this.routerService.getNoteIdFromRoute();
    //
    //     if (maybeNoteId) {
    //         this.store.dispatch(deleteNoteAttempt({ noteId: maybeNoteId }));
    //     } else if (maybeFolderId) {
    //         this.store.dispatch(deleteFoldersAttempt({ folderId: maybeFolderId }));
    //     }
    // }
}
