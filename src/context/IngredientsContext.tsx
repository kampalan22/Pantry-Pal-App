import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ingredient, IngredientFormData } from '../types';
import { createIngredient, loadIngredientsFromStorage, saveIngredientsToStorage } from '../utils/helpers';

interface IngredientsContextType {
  ingredients: Ingredient[];
  addIngredient: (formData: IngredientFormData) => void;
  updateIngredient: (id: string, formData: IngredientFormData) => void;
  deleteIngredient: (id: string) => void;
  getIngredientById: (id: string) => Ingredient | undefined;
}

const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error('useIngredients must be used within an IngredientsProvider');
  }
  return context;
};

interface IngredientsProviderProps {
  children: ReactNode;
}

export const IngredientsProvider: React.FC<IngredientsProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // Load ingredients from localStorage on initial render
  useEffect(() => {
    const storedIngredients = loadIngredientsFromStorage();
    setIngredients(storedIngredients);
  }, []);

  // Save ingredients to localStorage whenever they change
  useEffect(() => {
    saveIngredientsToStorage(ingredients);
  }, [ingredients]);

  const addIngredient = (formData: IngredientFormData) => {
    const newIngredient = createIngredient(formData);
    setIngredients(prev => [...prev, newIngredient]);
  };

  const updateIngredient = (id: string, formData: IngredientFormData) => {
    setIngredients(prev => 
      prev.map(ingredient => 
        ingredient.id === id 
          ? { ...ingredient, ...formData, updatedAt: new Date().toISOString() } 
          : ingredient
      )
    );
  };

  const deleteIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ingredient => ingredient.id !== id));
  };

  const getIngredientById = (id: string) => {
    return ingredients.find(ingredient => ingredient.id === id);
  };

  const value = {
    ingredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getIngredientById,
  };

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};