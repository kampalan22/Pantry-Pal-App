import React, { useState, useMemo } from 'react';
import { useIngredients } from '../context/IngredientsContext';
import { IngredientCategory } from '../types';
import IngredientCard from './IngredientCard';
import { getAllCategories, formatCategoryName } from '../utils/helpers';
import { Plus, Search, Filter, PackageOpen } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';

interface IngredientListProps {
  onAddNew: () => void;
  onEditIngredient: (id: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({
  onAddNew,
  onEditIngredient,
}) => {
  const { ingredients, deleteIngredient } = useIngredients();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<IngredientCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((ingredient) => {
      const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || ingredient.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [ingredients, searchTerm, categoryFilter]);

  const categories = getAllCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex-1 relative">
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1"
          >
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          <Button onClick={onAddNew} className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
            <Plus size={16} />
            <span>Add Ingredient</span>
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="glass-card p-4 rounded-xl animate-fadeIn">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={categoryFilter === 'all' ? 'primary' : 'ghost'}
              onClick={() => setCategoryFilter('all')}
              className={categoryFilter === 'all' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : ''}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={categoryFilter === category ? 'primary' : 'ghost'}
                onClick={() => setCategoryFilter(category)}
                className={categoryFilter === category ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : ''}
              >
                {formatCategoryName(category)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {ingredients.length === 0 ? (
        <div className="glass-card text-center py-16 rounded-xl">
          <PackageOpen size={48} className="mx-auto text-emerald-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Welcome to Your Digital Pantry!</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Keep track of your ingredients and never run out of essentials again
          </p>
          <Button 
            onClick={onAddNew} 
            className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            <Plus size={16} className="mr-1" />
            Add Your First Ingredient
          </Button>
        </div>
      ) : filteredIngredients.length === 0 ? (
        <div className="glass-card text-center py-12 rounded-xl">
          <Search size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">No Matching Ingredients Found</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Try adjusting your search terms or category filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onEdit={() => onEditIngredient(ingredient.id)}
              onDelete={() => {
                if (window.confirm('Are you sure you want to delete this ingredient?')) {
                  deleteIngredient(ingredient.id);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientList;