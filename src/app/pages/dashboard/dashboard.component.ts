import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../app.store';
import { appBootAttempt } from '../../store/dashboard/dashboard.actions';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    public loading$: Observable<boolean> = this.store.select(
        ({ dashboardState }: AppStore) => dashboardState.loading,
    );

    constructor(private store: Store<AppStore>, private readonly router: Router) {}

    public ngOnInit(): void {
        const maybeFolderId = this.parseUrlForFolderId(this.router.url);
        const maybeNoteId = this.parseUrlForNoteId(this.router.url);
        this.store.dispatch(
            appBootAttempt({ folderId: maybeFolderId, noteId: maybeNoteId }),
        );
    }

    // TODO: hack!!
    private parseUrlForFolderId(url: string): number | undefined {
        const [_, firstSplit] = url.split('/folder/');

        if (!firstSplit) {
            return undefined;
        }

        const [maybeFolderId] = firstSplit.split('/');

        if (maybeFolderId) {
            return parseInt(maybeFolderId, 10);
        }
        return undefined;
    }

    // TODO: hack!!
    private parseUrlForNoteId(url: string): number | undefined {
        const [_, firstSplit] = url.split('/note/');

        if (!firstSplit) {
            return undefined;
        }

        const [maybeFolderId] = firstSplit.split('/');

        if (maybeFolderId) {
            return parseInt(maybeFolderId, 10);
        }
        return undefined;
    }
}
