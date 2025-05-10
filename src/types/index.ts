export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  quantity: number;
  unit: string;
  expiryDate?: string;
  notes?: string;
  createdAt: string;
}

export type IngredientCategory = 
  | 'produce'
  | 'dairy'
  | 'protein'
  | 'grains'
  | 'spices'
  | 'baking'
  | 'frozen'
  | 'canned'
  | 'other';

export interface IngredientFormData {
  name: string;
  category: IngredientCategory;
  quantity: number;
  unit: string;
  expiryDate?: string;
  notes?: string;
}