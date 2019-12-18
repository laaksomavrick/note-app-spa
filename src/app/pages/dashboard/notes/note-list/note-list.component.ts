import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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

    constructor(private readonly router: Router) {
        this.notes$ = of([]);
        this.error$ = of(undefined);
        this.loading$ = of(false);
        this.router = router;
    }

    public ngOnInit(): void {}

    public async onClickNote(note: Note): Promise<void> {
        const noteId = note.id;
        const folderId = note.folderId;
        await this.router.navigate(['folder', folderId, 'note', noteId]);
    }
}
