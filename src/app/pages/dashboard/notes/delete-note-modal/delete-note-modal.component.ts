import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppStore } from "../../../../app.store";
import {
    createNoteAttempt,
    deleteNoteAttempt,
    toggleCreateNoteVisible,
    toggleDeleteNoteVisible,
} from "../../../../store/notes/notes.actions";
import { Note } from "../../../../store/notes/notes.interfaces";

@Component({
    selector: "app-delete-note-modal",
    templateUrl: "./delete-note-modal.component.html",
    styleUrls: ["./delete-note-modal.component.css"],
})
export class DeleteNoteModalComponent {
    public loading$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.createNoteLoading,
    );

    public selectedNote$: Observable<Note | undefined> = this.store.select(
        ({ notesState }: AppStore) => notesState.selectedNote,
    );

    constructor(private readonly store: Store<AppStore>, private readonly router: Router) {}

    public onClose = (): void => {
        this.store.dispatch(toggleDeleteNoteVisible());
    }

    public onDelete = async (): Promise<void> => {
        const isLoading = await this.loading$.pipe(take(1)).toPromise();
        const note = await this.selectedNote$.pipe(take(1)).toPromise();

        if (isLoading) {
            return;
        }

        if (note === undefined) {
            console.warn("selected folder id not set");
            return;
        }

        const noteId = note.id;
        const folderId = note.folderId;

        this.store.dispatch(deleteNoteAttempt({ noteId }));

        this.loading$.subscribe(async (loading: boolean) => {
            if (!loading) {
                await this.router.navigate(["/folder", folderId]);
                this.onClose();
            }
        });
    }
}
