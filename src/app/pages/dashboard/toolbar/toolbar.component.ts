import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../../app.store';
import { toggleCreateNoteVisible } from '../../../store/notes/notes.actions';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
    public noteSaving$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.updateNoteLoading,
    );

    constructor(private store: Store<AppStore>) {}

    public ngOnInit(): void {}

    public onClickNew(): void {
        // TODO: if in folder, new folder
        // if none, nothing
        // if folder/note, new note
        this.store.dispatch(toggleCreateNoteVisible());
    }
}
