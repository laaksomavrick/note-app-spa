import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppStore } from '../../../../app.store';
import {
    createFoldersAttempt,
    toggleCreateFolderVisible,
} from '../../../../store/folders/folders.actions';

@Component({
    selector: 'app-create-folder',
    templateUrl: './create-folder.component.html',
    styleUrls: ['./create-folder.component.css'],
})
export class CreateFolderComponent implements OnInit {
    public visible$: Observable<boolean> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.createFolderVisible,
    );

    public loading$: Observable<boolean> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.createFolderLoading,
    );

    public newFolderInput?: string;

    constructor(private readonly store: Store<AppStore>) {}

    public ngOnInit(): void {}

    public async onEnterKeydownNewFolder(event: KeyboardEvent): Promise<void> {
        if (event.keyCode === 13) {
            await this.handleCreateFolder();
        }
    }

    public async onClickAwayNewFolder(): Promise<void> {
        await this.handleCreateFolder();
    }

    private async handleCreateFolder(): Promise<void> {
        const currentlyProcessing = await this.loading$.pipe(take(1)).toPromise();

        if (currentlyProcessing) {
            return;
        }

        const name = this.newFolderInput;

        if (name && name.length > 0) {
            this.store.dispatch(createFoldersAttempt({ name }));
        } else {
            this.store.dispatch(toggleCreateFolderVisible());
        }
    }
}
