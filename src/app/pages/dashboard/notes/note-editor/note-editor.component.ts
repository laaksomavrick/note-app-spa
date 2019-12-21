import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../../../app.store';
import { setSelectedNote } from '../../../../store/notes/notes.actions';
import { Note } from '../../../../store/notes/notes.interfaces';

@Component({
    selector: 'app-note-editor',
    templateUrl: './note-editor.component.html',
    styleUrls: ['./note-editor.component.css'],
})
export class NoteEditorComponent implements OnInit {
    public selectedNote$: Observable<Note | undefined> = this.store.select(
        ({ notesState }: AppStore) => notesState.selectedNote,
    );

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store<AppStore>,
    ) {}

    public ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            const maybeNoteId = params.get('noteId');
            if (maybeNoteId) {
                const noteId = parseInt(maybeNoteId, 10);
                this.store.dispatch(setSelectedNote({ noteId }));
            }
        });
    }

    public handleNoteTitleChange(event: KeyboardEvent): void {
        if (event.target) {
            // tslint:disable-next-line:no-any
            const newTitle = (event.target as any).value;
            console.log(newTitle);
        }
    }
}
