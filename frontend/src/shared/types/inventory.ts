export interface Item {
  _id: string;
  name: string;
  description: string;
  availableQuantity: number;
  unit: string;
  alertQuantity: number;
  inventoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  _id: string;
  name: string;
  userId: string | null;
}

export interface Inventory {
  _id: string;
  name: string;
  status: string;
  userId: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}
