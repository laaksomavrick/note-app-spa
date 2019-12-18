import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Folder } from '../../../../store/folders/folders.interfaces';

@Component({
    selector: 'app-folder-list',
    templateUrl: './folder-list.component.html',
    styleUrls: ['./folder-list.component.css'],
})
export class FolderListComponent implements OnInit {
    @Input() public folders$: Observable<Folder[]>;

    @Input() public error$: Observable<string | undefined>;

    @Input() public loading$: Observable<boolean>;

    private readonly router: Router;

    constructor(router: Router) {
        this.folders$ = of([]);
        this.error$ = of(undefined);
        this.loading$ = of(false);
        this.router = router;
    }

    public ngOnInit(): void {}

    public async onClickFolder(folder: Folder): Promise<void> {
        const folderId = folder.id;
        await this.router.navigate(['/folder', folderId]);
    }
}
