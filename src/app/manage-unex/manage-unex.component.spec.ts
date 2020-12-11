import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUnexComponent } from './manage-unex.component';

describe('ManageUnexComponent', () => {
  let component: ManageUnexComponent;
  let fixture: ComponentFixture<ManageUnexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUnexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUnexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
