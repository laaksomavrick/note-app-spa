import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Folder } from '../folders.interfaces';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {

  @Input() public folders$: Observable<Folder[]>;

  @Input() public error$: Observable<string | undefined>;

  @Input() public loading$: Observable<boolean>;

  constructor() {
    this.folders$ = of([]);
    this.error$ = of(undefined);
    this.loading$ = of(false);
  }

  public ngOnInit(): void {
  }

  public onClickFolder(folder: Folder): void {
      console.log(folder.name);
  }

}
