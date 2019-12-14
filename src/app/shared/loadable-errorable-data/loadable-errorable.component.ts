import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-loadable-errorable',
  templateUrl: './loadable-errorable.component.html',
  styleUrls: ['./loadable-errorable.component.css']
})
export class LoadableErrorableComponent implements OnInit {

  @Input() public error$: Observable<string | undefined>;

  @Input() public loading$: Observable<boolean>;

  @Input() public containerClassName = '';

  constructor() {
    this.error$ = of(undefined);
    this.loading$ = of(false);
  }

  public ngOnInit(): void {
  }

}
