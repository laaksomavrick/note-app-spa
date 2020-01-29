import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppStore } from "../../../../app.store";
import { createNoteAttempt, toggleCreateNoteVisible } from "../../../../store/notes/notes.actions";

@Component({
    selector: "app-create-note-modal",
    templateUrl: "./create-note-modal.component.html",
    styleUrls: ["./create-note-modal.component.css"],
})
export class CreateNoteModalComponent {
    public loading$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.createNoteLoading,
    );

    public selectedFolderId$: Observable<number | undefined> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.selectedFolderId,
    );

    public form = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
    });

    constructor(
        private readonly store: Store<AppStore>,
        private readonly formBuilder: FormBuilder,
    ) {}

    public onClose = (): void => {
        this.store.dispatch(toggleCreateNoteVisible());
    }

    public onSave = async (): Promise<void> => {
        const isLoading = await this.loading$.pipe(take(1)).toPromise();
        const folderId = await this.selectedFolderId$.pipe(take(1)).toPromise();

        if (isLoading) {
            return;
        }

        if (folderId === undefined) {
            console.warn("selected folder id not set");
            return;
        }

        const nameControl = this.form.get("name");

        if (!nameControl) {
            return;
        }

        const name = nameControl.value;

        if (!name) {
            return;
        }

        // TODO: navigate to note on creation
        this.store.dispatch(createNoteAttempt({ name, folderId, content: "" }));

        this.loading$.subscribe((loading: boolean) => {
            if (!loading) {
                this.onClose();
            }
        });
    }
}
