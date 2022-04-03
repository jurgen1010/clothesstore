export interface Attribute {
  value_name: string;
  attribute_group_name: string;
  id: string;
  name: string;
  value_id: null | string;
  value_struct: null;
  values: AttributeValue[];
  attribute_group_id: string;
  source: number;
}

interface AttributeValue {
  id?: string;
  name: string;
  struct?: string;
  source: number;
}
