import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchMessComponent } from './orch-mess.component';

describe('OrchMessComponent', () => {
  let component: OrchMessComponent;
  let fixture: ComponentFixture<OrchMessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrchMessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
