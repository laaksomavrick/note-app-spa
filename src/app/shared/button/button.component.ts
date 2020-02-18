import { Component, Input } from "@angular/core";

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.css"],
})
export class ButtonComponent {
    @Input() private readonly disabled = false;

    @Input() private readonly selected = false;

    @Input() private readonly type = "secondary";
}
