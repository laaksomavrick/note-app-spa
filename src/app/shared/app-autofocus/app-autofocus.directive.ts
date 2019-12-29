import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[appAutoFocus]",
})
export class AppAutofocusDirective implements OnInit {
    constructor(private elementRef: ElementRef) {}

    public ngOnInit(): void {
        this.elementRef.nativeElement.focus();
    }
}
