import { Component, Input, OnInit } from '@angular/core';
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

    constructor() {
        this.notes$ = of([]);
        this.error$ = of(undefined);
        this.loading$ = of(false);
    }

    public ngOnInit(): void {}

    public onClickNote(note: Note): void {
        console.log(note.name);
    }
}
