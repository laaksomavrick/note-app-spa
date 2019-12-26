import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppStore } from '../../../../app.store';
import {
    createNoteAttempt,
    toggleCreateNoteVisible,
} from '../../../../store/notes/notes.actions';

@Component({
    selector: 'app-create-note',
    templateUrl: './create-note.component.html',
    styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
    public visible$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.createNoteVisible,
    );

    public loading$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.createNoteLoading,
    );

    @Input() public folderId?: number;

    constructor(private readonly store: Store<AppStore>) {}

    public ngOnInit(): void {}

    private handleCreateNote = async (name: string): Promise<void> => {
        const currentlyProcessing = await this.loading$.pipe(take(1)).toPromise();

        if (currentlyProcessing) {
            return;
        }

        if (!this.folderId) {
            console.warn('No folderId specified for handleCreateNote');
            return;
        }

        if (name && name.length > 0) {
            this.store.dispatch(
                createNoteAttempt({ name, folderId: this.folderId, content: '' }),
            );
        } else {
            this.store.dispatch(toggleCreateNoteVisible());
        }
    }
}
