import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../../app.store';

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
}
