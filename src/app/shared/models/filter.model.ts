import { Sort } from '@appShared/models/shared/sort.model';

export interface Filter {
  id: string;
  name: string;
  type: string;
  values: FilterValue[];
}

interface FilterValue {
  id: string;
  name: string;
  path_from_root: Sort[];
}
