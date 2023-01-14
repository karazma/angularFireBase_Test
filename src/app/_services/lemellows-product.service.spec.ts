import { TestBed } from '@angular/core/testing';

import { LemellowsProductService } from './lemellows-product.service';

describe('LemellowsProductService', () => {
  let service: LemellowsProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LemellowsProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
