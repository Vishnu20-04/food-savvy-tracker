
export interface FoodItem {
  id: string;
  name: string;
  expiryDate: Date;
  barcode?: string;
  imageUrl?: string;
  createdAt: Date;
}

export type FoodStatus = 'fresh' | 'expiring' | 'expired';
