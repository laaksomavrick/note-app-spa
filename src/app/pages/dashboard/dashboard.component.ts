import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';
import { getFoldersAttempt } from '../../store/folders/folders.actions';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    constructor(private store: Store<AppStore>, private readonly router: Router) {}

    public ngOnInit(): void {
        // TODO: this.store.dispatch(appBoot)
        const maybeFolderId = this.parseUrlForFolderId(this.router.url);
        this.store.dispatch(getFoldersAttempt({ folderId: maybeFolderId }));
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
}
