import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParamsSearch } from '@appShared/models/shared/params-search.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchControlService {
  itemPorPage: number = 12;
  paramsSearch = new BehaviorSubject<ParamsSearch>({ q: '', limit: this.itemPorPage, offset: 0 });
  paramsSearch$ = this.paramsSearch.asObservable();

  set params(params: ParamsSearch) {
    this.paramsSearch.next(params);
  }
}
