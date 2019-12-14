import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../app.store';
import { getFoldersAttempt } from '../../store/folders/folders.actions';
import { Folder } from './folders/folders.interfaces';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

    public folders$: Observable<Folder[]> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.folders,
    );

    public foldersError$: Observable<string | undefined> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.error,
    );

    public foldersLoading$: Observable<boolean> = this.store.select(
        ({ foldersState }: AppStore) => foldersState.loading,
    );

    constructor(private store: Store<AppStore>) {}

    public ngOnInit(): void {
        this.store.dispatch(getFoldersAttempt());
    }
}
