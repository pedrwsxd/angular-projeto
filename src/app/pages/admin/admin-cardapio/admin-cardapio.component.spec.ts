import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardapioComponent } from './admin-cardapio.component';

describe('AdminCardapioComponent', () => {
  let component: AdminCardapioComponent;
  let fixture: ComponentFixture<AdminCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCardapioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
