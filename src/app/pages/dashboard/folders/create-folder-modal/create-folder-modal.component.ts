import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppStore } from "../../../../app.store";
import {
    createFoldersAttempt,
    toggleCreateFolderVisible,
} from "../../../../store/folders/folders.actions";

@Component({
    selector: "app-create-folder-modal",
    templateUrl: "./create-folder-modal.component.html",
    styleUrls: ["./create-folder-modal.component.css"],
})
export class CreateFolderModalComponent {
    public loading$: Observable<boolean> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.createFolderLoading,
    );

    public form = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
    });

    constructor(
        private readonly store: Store<AppStore>,
        private readonly formBuilder: FormBuilder,
    ) {}

    public onClose(): void {
        this.store.dispatch(toggleCreateFolderVisible());
    }

    public onSave = async (): Promise<void> => {
        const isLoading = await this.loading$.pipe(take(1)).toPromise();

        if (isLoading) {
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

        this.store.dispatch(createFoldersAttempt({ name }));

        this.loading$.subscribe((loading: boolean) => {
            if (!loading) {
                this.onClose();
            }
        });
    }
}
