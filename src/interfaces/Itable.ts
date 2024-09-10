export interface ItopCustomers extends Object {
  username: string;
  order: number;
  price: string;
}

export type TlatestTransactions = {
  orderId: string;
  customer: string;
  totalPrice: string;
  date: string;
  status: string;
};

export interface IemployeeTable {
  ID: number | string;
  userName: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  totalOrders: number;
  totalSpend: string;
  location: string;
}

export interface IProductsTable {
  ID: number | string;
  pic: string;
  product: string;
  inventory: number;
  price: string;
  category: string;
}

export type complex =
  | ItopCustomers
  | TlatestTransactions
  | IemployeeTable
  | IProductsTable;

export interface Itable {
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  bodyData: (
    | ItopCustomers
    | TlatestTransactions
    | IemployeeTable
    | IProductsTable
  )[];
}
