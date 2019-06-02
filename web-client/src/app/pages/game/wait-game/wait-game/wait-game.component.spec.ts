import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitGameComponent } from './wait-game.component';

describe('WaitGameComponent', () => {
  let component: WaitGameComponent;
  let fixture: ComponentFixture<WaitGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
