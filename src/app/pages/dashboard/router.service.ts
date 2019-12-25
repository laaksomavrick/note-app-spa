import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {
    constructor(private readonly router: Router) {}

    public getFolderIdFromRoute(): number | undefined {
        const url = this.router.url;
        return this.parseUrlForFolderId(url);
    }

    public getNoteIdFromRoute(): number | undefined {
        const url = this.router.url;
        return this.parseUrlForNoteId(url);
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
