import { TestBed } from '@angular/core/testing';

import { CipherbayService } from './cipherbay.service';

describe('CipherbayService', () => {
  let service: CipherbayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CipherbayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
