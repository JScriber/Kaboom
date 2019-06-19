import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContestComponent } from './list-contest.component';

describe('ListContestComponent', () => {
  let component: ListContestComponent;
  let fixture: ComponentFixture<ListContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
