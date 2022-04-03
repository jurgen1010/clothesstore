import { Product } from '@appShared/models/Products/product.model';
import { AvailableFilter } from '@appShared/models/available-filter.model';
import { Sort } from '@appShared/models/shared/sort.model';
import { Filter } from '@appShared/models/filter.model';

export interface ItemsByCategory {
  site_id: string;
  country_default_time_zone: string;
  query?: string;
  paging: Paging;
  results: Product[];
  sort: Sort;
  available_sorts: Sort[];
  filters: Filter[];
  available_filters: AvailableFilter[];
}

export interface Paging {
  total: number;
  primary_results: number;
  offset: number;
  limit: number;
}
