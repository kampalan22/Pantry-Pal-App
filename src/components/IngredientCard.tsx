import React from 'react';
import { Ingredient } from '../types';
import { formatCategoryName, isExpiringSoon, isExpired } from '../utils/helpers';
import Button from './ui/Button';
import { Edit, Trash2, AlertTriangle, Calendar, Hash } from 'lucide-react';

interface IngredientCardProps {
  ingredient: Ingredient;
  onEdit: () => void;
  onDelete: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  onEdit,
  onDelete,
}) => {
  const { name, category, quantity, unit, expiryDate, notes } = ingredient;
  
  const expiringSoon = expiryDate && isExpiringSoon(expiryDate);
  const expired = expiryDate && isExpired(expiryDate);
  
  // Category colors with more vibrant options
  const categoryColors: Record<string, string> = {
    produce: 'from-green-500 to-emerald-500 text-white',
    dairy: 'from-blue-500 to-sky-500 text-white',
    protein: 'from-rose-500 to-red-500 text-white',
    grains: 'from-amber-500 to-yellow-500 text-white',
    spices: 'from-orange-500 to-amber-500 text-white',
    baking: 'from-yellow-500 to-amber-500 text-white',
    frozen: 'from-cyan-500 to-blue-500 text-white',
    canned: 'from-purple-500 to-fuchsia-500 text-white',
    other: 'from-slate-500 to-gray-500 text-white',
  };
  
  return (
    <div className={`glass-card rounded-xl p-4 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 animate-slideIn
      ${expired ? 'border-l-4 border-l-red-500' : expiringSoon ? 'border-l-4 border-l-amber-500' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{name}</h3>
          <div className="flex flex-wrap gap-2">
            <span className={`category-badge bg-gradient-to-r ${categoryColors[category]}`}>
              {formatCategoryName(category)}
            </span>
            {(expired || expiringSoon) && (
              <span className={`category-badge flex items-center gap-1
                ${expired ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                <AlertTriangle size={12} />
                {expired ? 'Expired' : 'Expiring Soon'}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEdit}
            aria-label="Edit ingredient"
            className="text-slate-500 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
            aria-label="Delete ingredient"
            className="text-slate-500 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-slate-700 dark:text-slate-200">
          <Hash size={16} className="mr-2 text-slate-400 dark:text-slate-500" />
          <span className="font-medium">{quantity}</span>
          <span className="ml-1">{unit}</span>
        </div>
        
        {expiryDate && (
          <div className="flex items-center text-slate-700 dark:text-slate-200">
            <Calendar size={16} className="mr-2 text-slate-400 dark:text-slate-500" />
            <span className={expired ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
              {new Date(expiryDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        {notes && (
          <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-sm text-slate-600 dark:text-slate-300">
            {notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientCard;