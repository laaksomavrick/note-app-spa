import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListItemCreateButtonComponent } from "./list-item-create-button.component";

describe("ListItemCreateButtonComponent", () => {
    let component: ListItemCreateButtonComponent;
    let fixture: ComponentFixture<ListItemCreateButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListItemCreateButtonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListItemCreateButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
