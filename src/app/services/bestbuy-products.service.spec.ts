import { TestBed } from '@angular/core/testing';

import { BestbuyProductsService } from './bestbuy-products.service';

describe('BestbuyProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BestbuyProductsService = TestBed.get(BestbuyProductsService);
    expect(service).toBeTruthy();
  });
});
