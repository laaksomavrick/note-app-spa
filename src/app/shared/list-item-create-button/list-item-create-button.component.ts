import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-list-item-create-button',
    templateUrl: './list-item-create-button.component.html',
    styleUrls: ['./list-item-create-button.component.css'],
})
export class ListItemCreateButtonComponent implements OnInit {
    @Input() public visible$: Observable<boolean>;

    @Input() public loading$: Observable<boolean>;

    @Input() public handler?: (input?: string) => Promise<void> = undefined;

    @Input() public inputClass = '';

    public newItemNameInput?: string;

    constructor() {
        this.visible$ = of(false);
        this.loading$ = of(false);
    }

    public ngOnInit(): void {}

    public async onEnterKeydown(event: KeyboardEvent): Promise<void> {
        if (!this.handler) {
            return;
        }

        if (event.keyCode === 13) {
            await this.handler(this.newItemNameInput);
            this.newItemNameInput = undefined;
        }
    }

    public async onClickAway(): Promise<void> {
        if (!this.handler) {
            return;
        }

        await this.handler(this.newItemNameInput);
        this.newItemNameInput = undefined;
    }
}
