import { TestBed } from '@angular/core/testing';

import { ProductSearchControlService } from './product-search-control.service';

describe('SearchProductControlService', () => {
  let service: ProductSearchControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSearchControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
