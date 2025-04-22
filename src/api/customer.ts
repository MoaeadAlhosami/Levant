import api from './index';
import type { Ad, Category, Item } from '../types';

export function fetchCustomerAds(restaurantId: number) {
  return api.get<{ data: Ad[] }>(
    `/customer_api/show_advertisements?restaurant_id=${restaurantId}`
  );
}

export function fetchCategories(
  restaurantId: number,
  categoryId?: number
) {
  const suffix = categoryId ? `&category_id=${categoryId}` : '';
  return api.get<{ data: Category[] }>(
    `/customer_api/show_restaurant_categories?restaurant_id=${restaurantId}${suffix}`
  );
}

export function fetchItems(categoryId: number) {
  return api.get<{ data: Item[] }>(
    `/customer_api/show_items?category_id=${categoryId}`
  );
}

export function fetchRestaurantByName(name: string) {
  return api.get<{ data: any }>(
    `/customer_api/show_restaurant_by_name_or_id?restaurant_name=${name}`
  );
}