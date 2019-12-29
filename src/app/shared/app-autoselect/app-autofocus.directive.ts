import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[appAutoSelect]",
})
export class AppAutoselectDirective implements OnInit {
    constructor(private elementRef: ElementRef) {}

    public ngOnInit(): void {
        this.elementRef.nativeElement.select();
    }
}
