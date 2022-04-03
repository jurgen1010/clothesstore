import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemsByCategory } from '@appShared/models/items-by-category.model';
import { environment } from '@env/environment';
import { ParamsSearch } from '@appShared/models/shared/params-search.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsByCategoryService {
  public items: ItemsByCategory | undefined;

  constructor(private http: HttpClient) {}

  searchItemsInCategory(paramsSearch?: ParamsSearch): Observable<ItemsByCategory> {
    let params: HttpParams | undefined;

    if (paramsSearch) {
      const { q, limit, offset } = paramsSearch;
      params = new HttpParams(
        q
          ? {
              fromObject: { q, limit: limit as unknown as string, offset: offset as unknown as string }
            }
          : {
              fromObject: { limit: limit as unknown as string, offset: offset as unknown as string }
            }
      );
    }

    return this.http.get<ItemsByCategory>(`${environment.baseUrlCO}/search?category=${environment.categoryId}`, {
      params
    });
  }

  public getItemsByCategory(paramsSearch?: ParamsSearch): void {
    this.searchItemsInCategory(paramsSearch).subscribe(
      (items) => {
        if (items) {
          this.items = items;
        }
      },
      () => {
        this.items = undefined;
      }
    );
  }
}
