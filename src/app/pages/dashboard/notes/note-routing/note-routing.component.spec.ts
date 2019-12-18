import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteRoutingComponent } from './note-routing.component';

describe('NoteRoutingComponent', () => {
    let component: NoteRoutingComponent;
    let fixture: ComponentFixture<NoteRoutingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NoteRoutingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoteRoutingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
