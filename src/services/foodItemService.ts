
import { FoodItem, FoodStatus } from '@/types';

// In a real app, this would connect to a backend API
// For now, we'll use localStorage to persist data

const STORAGE_KEY = 'food-items';

// Get all food items from localStorage
export const getAllFoodItems = (): FoodItem[] => {
  const items = localStorage.getItem(STORAGE_KEY);
  if (!items) return [];
  
  try {
    // Parse dates correctly
    const parsedItems = JSON.parse(items, (key, value) => {
      if (key === 'expiryDate' || key === 'createdAt') {
        return new Date(value);
      }
      return value;
    });
    
    return parsedItems;
  } catch (error) {
    console.error('Error parsing food items:', error);
    return [];
  }
};

// Add a new food item
export const addFoodItem = (item: Omit<FoodItem, 'id' | 'createdAt'>): FoodItem => {
  const items = getAllFoodItems();
  
  const newItem: FoodItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date()
  };
  
  const updatedItems = [...items, newItem];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  
  return newItem;
};

// Update an existing food item
export const updateFoodItem = (id: string, updates: Partial<FoodItem>): FoodItem | null => {
  const items = getAllFoodItems();
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) return null;
  
  const updatedItem = { ...items[itemIndex], ...updates };
  items[itemIndex] = updatedItem;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return updatedItem;
};

// Delete a food item
export const deleteFoodItem = (id: string): boolean => {
  const items = getAllFoodItems();
  const updatedItems = items.filter(item => item.id !== id);
  
  if (updatedItems.length === items.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  return true;
};

// Get the status of a food item based on its expiry date
export const getFoodStatus = (expiryDate: Date): FoodStatus => {
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) {
    return 'expired';
  } else if (daysUntilExpiry <= 3) {
    return 'expiring';
  } else {
    return 'fresh';
  }
};

// Get days until expiry (negative for expired items)
export const getDaysUntilExpiry = (expiryDate: Date): number => {
  const now = new Date();
  return Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};
