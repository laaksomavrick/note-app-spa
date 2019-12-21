import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

    private selectedNoteId?: number;

    constructor(private readonly router: Router, private readonly route: ActivatedRoute) {
        this.notes$ = of([]);
        this.error$ = of(undefined);
        this.loading$ = of(false);
        this.router = router;
        this.route = route;
    }

    public ngOnInit(): void {
        // TODO
        this.route.paramMap.subscribe((params: ParamMap) => {
            const maybeNoteId = params.get('noteId');
            if (maybeNoteId) {
                const selectedNoteId = parseInt(maybeNoteId, 10);
                this.selectedNoteId = selectedNoteId;
            }
        });
    }

    public async onClickNote(note: Note): Promise<void> {
        const noteId = note.id;
        const folderId = note.folderId;
        await this.router.navigate(['folder', folderId, 'note', noteId]);
    }
}
