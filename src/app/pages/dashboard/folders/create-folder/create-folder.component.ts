import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AppStore } from "../../../../app.store";
import {
    createFoldersAttempt,
    toggleCreateFolderVisible,
} from "../../../../store/folders/folders.actions";

@Component({
    selector: "app-create-folder",
    templateUrl: "./create-folder.component.html",
    styleUrls: ["./create-folder.component.css"],
})
export class CreateFolderComponent {
    public visible$: Observable<boolean> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.createFolderVisible,
    );

    public loading$: Observable<boolean> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.createFolderLoading,
    );

    constructor(private readonly store: Store<AppStore>) {}

    private handleCreateFolder = async (name: string): Promise<void> => {
        const currentlyProcessing = await this.loading$.pipe(take(1)).toPromise();

        if (currentlyProcessing) {
            return;
        }

        if (name && name.length > 0) {
            this.store.dispatch(createFoldersAttempt({ name }));
        } else {
            this.store.dispatch(toggleCreateFolderVisible());
        }
    }
}
