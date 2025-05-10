import { Ingredient, IngredientCategory, IngredientFormData } from '../types';

// Generate a unique ID for new ingredients
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Create a new ingredient from form data
export const createIngredient = (formData: IngredientFormData): Ingredient => {
  return {
    id: generateId(),
    name: formData.name,
    category: formData.category,
    quantity: formData.quantity,
    unit: formData.unit,
    expiryDate: formData.expiryDate,
    notes: formData.notes,
    createdAt: new Date().toISOString(),
  };
};

// Get all categories
export const getAllCategories = (): IngredientCategory[] => {
  return [
    'produce',
    'dairy',
    'protein',
    'grains',
    'spices',
    'baking',
    'frozen',
    'canned',
    'other',
  ];
};

// Format category name for display
export const formatCategoryName = (category: IngredientCategory): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

// Check if ingredient is expiring soon (within 3 days)
export const isExpiringSoon = (expiryDate?: string): boolean => {
  if (!expiryDate) return false;
  
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 0 && diffDays <= 3;
};

// Check if ingredient is expired
export const isExpired = (expiryDate?: string): boolean => {
  if (!expiryDate) return false;
  
  const today = new Date();
  const expiry = new Date(expiryDate);
  
  return expiry < today;
};

// Load ingredients from localStorage
export const loadIngredientsFromStorage = (): Ingredient[] => {
  const stored = localStorage.getItem('ingredients');
  return stored ? JSON.parse(stored) : [];
};

// Save ingredients to localStorage
export const saveIngredientsToStorage = (ingredients: Ingredient[]): void => {
  localStorage.setItem('ingredients', JSON.stringify(ingredients));
};