import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetControlComponent } from './set-control.component';

describe('SetControlComponent', () => {
  let component: SetControlComponent;
  let fixture: ComponentFixture<SetControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
