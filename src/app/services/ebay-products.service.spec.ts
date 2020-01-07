import { TestBed } from '@angular/core/testing';

import { EbayProductsService } from './ebay-products.service';

describe('EbayProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EbayProductsService = TestBed.get(EbayProductsService);
    expect(service).toBeTruthy();
  });
});
