import { animate, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

const FADE_IN_OUT_MS = 200;

@Component({
    selector: "app-loading-mask",
    templateUrl: "./loading-mask.component.html",
    styleUrls: ["./loading-mask.component.css"],
    animations: [
        trigger("fadeInOut", [
            transition(":enter", [animate(FADE_IN_OUT_MS, style({ opacity: 1 }))]),
            transition(":leave", [animate(FADE_IN_OUT_MS, style({ opacity: 0 }))]),
        ]),
    ],
})
export class LoadingMaskComponent {}
