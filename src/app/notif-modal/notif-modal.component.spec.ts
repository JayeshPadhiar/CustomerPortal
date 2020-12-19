import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifModalComponent } from './notif-modal.component';

describe('NotifModalComponent', () => {
  let component: NotifModalComponent;
  let fixture: ComponentFixture<NotifModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
