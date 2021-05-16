import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPortalComponent } from './c-portal.component';

describe('CPortalComponent', () => {
  let component: CPortalComponent;
  let fixture: ComponentFixture<CPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CPortalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
