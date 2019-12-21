import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppStore } from '../../../../app.store';
import { Folder } from '../../../../store/folders/folders.interfaces';
import { Note } from '../../../../store/notes/notes.interfaces';

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
    @Input() public notes$: Observable<Note[]>;

    @Input() public error$: Observable<string | undefined>;

    @Input() public loading$: Observable<boolean>;

    public selectedNote$: Observable<Note | undefined> = this.store.select(
        ({ notesState }: AppStore) =>
            notesState.selectedNote ? notesState.selectedNote : undefined,
    );

    public selectedNoteId?: number = undefined;

    constructor(
        private readonly router: Router,
        private readonly store: Store<AppStore>,
    ) {
        this.notes$ = of([]);
        this.error$ = of(undefined);
        this.loading$ = of(false);
        this.router = router;
        this.store = store;
    }

    public ngOnInit(): void {
        this.selectedNote$.subscribe((selectedNote: Note | undefined): void => {
            this.selectedNoteId = selectedNote ? selectedNote.id : undefined;
        });
    }

    public async onClickNote(note: Note): Promise<void> {
        const noteId = note.id;
        const folderId = note.folderId;
        await this.router.navigate(['folder', folderId, 'note', noteId]);
    }
}
