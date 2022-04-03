export interface PriceType {
  id: string;
  prices: Price[];
  presentation: Presentation;
  payment_method_prices: any[];
  reference_prices: any[];
  purchase_discounts: any[];
}

export interface Price {
  id: string;
  type: string;
  conditions: Conditions;
  amount: number;
  regular_amount?: number;
  currency_id: string;
  exchange_rate_context: string;
  last_updated: Date;
}

interface Conditions {
  context_restrictions: any[];
  start_time?: Date;
  end_time?: Date;
  eligible: boolean;
}

interface Presentation {
  display_currency: string;
}
