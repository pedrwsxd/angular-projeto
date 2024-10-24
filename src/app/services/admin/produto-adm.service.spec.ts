import { TestBed } from '@angular/core/testing';

import { ProdutoAdmService } from './produto-adm.service';

describe('ProdutoAdmService', () => {
  let service: ProdutoAdmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoAdmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
