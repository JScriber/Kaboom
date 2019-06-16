import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPreviewComponent } from './contest-preview.component';

describe('ContestPreviewComponent', () => {
  let component: ContestPreviewComponent;
  let fixture: ComponentFixture<ContestPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
