import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarAdmComponent } from './gerenciar-adm.component';

describe('GerenciarAdmComponent', () => {
  let component: GerenciarAdmComponent;
  let fixture: ComponentFixture<GerenciarAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerenciarAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
