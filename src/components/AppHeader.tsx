import React from 'react';
import { Refrigerator, Moon, Sun } from 'lucide-react';
import { useIngredients } from '../context/IngredientsContext';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';

const AppHeader: React.FC = () => {
  const { ingredients } = useIngredients();
  const { isDark, toggleTheme } = useTheme();
  
  const totalItems = ingredients.length;
  const expiringItems = ingredients.filter(item => 
    item.expiryDate && new Date(item.expiryDate) > new Date() && 
    new Date(item.expiryDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  ).length;
  
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-900 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Refrigerator className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                PantryPal
              </h1>
              <p className="text-sm text-emerald-100">
                Your smart kitchen companion
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <p className="text-sm text-emerald-100">Total Items</p>
                <p className="text-2xl font-semibold">{totalItems}</p>
              </div>
              {expiringItems > 0 && (
                <div className="px-4 py-2 bg-amber-500/20 rounded-lg animate-bounce-subtle">
                  <p className="text-sm text-emerald-100">Expiring Soon</p>
                  <p className="text-2xl font-semibold">{expiringItems}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="text-white hover:bg-white/20"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;