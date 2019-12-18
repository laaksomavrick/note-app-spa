import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../../../app.store';
import { getNotesAttempt } from '../../../../store/notes/notes.actions';
import { Note } from '../../../../store/notes/notes.interfaces';

@Component({
    selector: 'app-note-routing',
    templateUrl: './note-routing.component.html',
    styleUrls: ['./note-routing.component.css'],
})
export class NoteRoutingComponent implements OnInit {
    public notes$: Observable<Note[]> = this.store.select(
        ({ notesState }: AppStore) => notesState.notes,
    );

    public notesError$: Observable<string | undefined> = this.store.select(
        ({ notesState }: AppStore) => notesState.error,
    );

    public notesLoading$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.loading,
    );

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store<AppStore>,
    ) {}

    public ngOnInit(): void {
        // on init, need to get folderId from route
        // need to dispatch getNotesAttempt
        this.route.paramMap.subscribe((params: ParamMap) => {
            const maybeFolderId = params.get('folderId');
            if (maybeFolderId) {
                const folderId = parseInt(maybeFolderId, 10);
                this.store.dispatch(getNotesAttempt({ folderId }));
            }
        });
    }
}
