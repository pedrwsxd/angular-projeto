import { TestBed } from '@angular/core/testing';

import { AdminAccessResolver } from './admin-access-resolver.service';

describe('AdminAccessResolver', () => {
  let service: AdminAccessResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAccessResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
