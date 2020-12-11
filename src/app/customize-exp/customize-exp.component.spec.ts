import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeExpComponent } from './customize-exp.component';

describe('CustomizeExpComponent', () => {
  let component: CustomizeExpComponent;
  let fixture: ComponentFixture<CustomizeExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
