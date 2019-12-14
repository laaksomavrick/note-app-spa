import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadableErrorableComponent } from './loadable-errorable.component';

describe('FolderListComponent', () => {
  let component: LoadableErrorableComponent;
  let fixture: ComponentFixture<LoadableErrorableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadableErrorableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadableErrorableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
