export interface Ad {
  id: number;
  title: string;
  from_date: string;
  to_date: string;
  image: string;
  restaurant: string;
  is_panorama: number;
  hide_date: number;
}

export interface Table {
  id: number;
  number_table: number;
  num: string;
  new_order: number;
  is_qr_table: number;
}

export interface CategoryWithItems {
  id: number;
  name: string;
  items: {
    id: number;
    name: string;
  }[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  content: number;
}

export interface Item {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string | null;
}
