import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../../app.store';
import { toggleCreateNoteVisible } from '../../../store/notes/notes.actions';
import { RouterService } from '../router.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
    public noteSaving$: Observable<boolean> = this.store.select(
        ({ notesState }: AppStore) => notesState.updateNoteLoading,
    );

    constructor(
        private readonly store: Store<AppStore>,
        private readonly routerService: RouterService,
    ) {}

    public ngOnInit(): void {}

    public onClickNew(): void {
        const maybeFolderId = this.routerService.getFolderIdFromRoute();

        if (maybeFolderId) {
            this.store.dispatch(toggleCreateNoteVisible());
        }
    }
}
