import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.css"],
})
export class ModalComponent {
    @Input()
    public title: string;

    @Input()
    public onClose: () => void;

    @Input()
    public saving$?: Observable<boolean>;

    @Input()
    public savingDisabled?: boolean;

    @Input()
    public onSave?: () => Promise<void>;

    @Input()
    public onDelete?: () => Promise<void>;

    constructor() {
        this.title = "";
        this.saving$ = undefined;
        this.onSave = undefined;
        // tslint:disable-next-line:no-empty
        this.onClose = (): void => {};
        this.savingDisabled = undefined;
    }
}
