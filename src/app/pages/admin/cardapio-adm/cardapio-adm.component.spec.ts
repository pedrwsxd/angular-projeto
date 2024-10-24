import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioAdmComponent } from './cardapio-adm.component';

describe('CardapioAdmComponent', () => {
  let component: CardapioAdmComponent;
  let fixture: ComponentFixture<CardapioAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardapioAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardapioAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
