import { of, throwError } from 'rxjs';
import { ItemsByCategory } from '@appShared/models/items-by-category.model';
import { HttpErrorResponse } from '@angular/common/http';
import ItemsByCategorySample from '@assets/json/products_by_category_10_items.json';
import { ParamsSearch } from '@appShared/models/shared/params-search.model';
import { environment } from '@env/environment';
import { ItemsByCategoryService } from './items-by-category.service';

describe('ItemsByCategoryService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let itemsByCategorySvc: ItemsByCategoryService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    itemsByCategorySvc = new ItemsByCategoryService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(itemsByCategorySvc).toBeTruthy();
  });

  it('should return expected items (HttpClient called once)', () => {
    // Data mock
    const mockProductsSearch: ItemsByCategory = ItemsByCategorySample as unknown as ItemsByCategory;
    httpClientSpy.get.and.returnValue(of(mockProductsSearch));

    const mockParamsSearch: ParamsSearch = { q: 'niños', limit: 10, offset: 0 };
    const { q, limit, offset } = mockParamsSearch;
    itemsByCategorySvc.getItemsByCategory(mockParamsSearch);

    expect(itemsByCategorySvc.items?.filters[0].values[0].id).toBe(environment.categoryId);
    expect(itemsByCategorySvc.items?.query).toBe(q);
    expect(itemsByCategorySvc.items?.paging.limit).toBe(limit);
    expect(itemsByCategorySvc.items?.paging.offset).toBe(offset);
    expect(itemsByCategorySvc.items?.results.length).toBe(limit);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call'); // Para hacer un sólo llamado del test
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    itemsByCategorySvc.getItemsByCategory();

    expect(itemsByCategorySvc.items).toBeUndefined();
  });
});
