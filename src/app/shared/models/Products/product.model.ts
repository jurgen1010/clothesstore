import { Sort } from '@appShared/models/shared/sort.model';
import { PriceType } from '@appShared/models/Products/price-type.model';
import { Attribute } from '@appShared/models/Products/attribute.model';

export interface Product {
  id: string;
  site_id: string;
  title: string;
  seller: Seller;
  price: number;
  prices: PriceType;
  sale_price?: string;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  stop_time: Date;
  condition: string;
  permalink: string;
  thumbnail: string;
  thumbnail_id: string;
  accepts_mercadopago: boolean;
  installments: Installments;
  address: Address;
  shipping: Shipping;
  seller_address: SellerAddress;
  attributes: Attribute[];
  differential_pricing: DifferentialPricing;
  original_price?: string;
  category_id: string;
  official_store_id: null;
  domain_id: string;
  catalog_product_id?: string;
  tags: string[];
  order_backend: number;
  use_thumbnail_id: boolean;
}

interface Seller {
  id: number;
  permalink?: string;
  registration_date?: string;
  car_dealer: boolean;
  real_estate_agency: boolean;
  tags?: string;
}

interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

export interface Address {
  state_id: string;
  state_name: string;
  city_id: string;
  city_name: string;
}

interface Shipping {
  free_shipping: boolean;
  mode: string;
  tags: string[];
  logistic_type: string;
  store_pick_up: boolean;
}

interface SellerAddress {
  id: string;
  comment: string;
  address_line: string;
  zip_code: string;
  country: Sort;
  state: Sort;
  city: Sort;
  latitude: string;
  longitude: string;
}

interface DifferentialPricing {
  id: number;
}
