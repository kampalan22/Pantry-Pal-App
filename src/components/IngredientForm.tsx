import React, { useState, useEffect } from 'react';
import { IngredientFormData, IngredientCategory } from '../types';
import { getAllCategories, formatCategoryName } from '../utils/helpers';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface IngredientFormProps {
  initialData?: IngredientFormData;
  onSubmit: (data: IngredientFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const defaultFormData: IngredientFormData = {
  name: '',
  category: 'other',
  quantity: 1,
  unit: 'unit',
  expiryDate: '',
  notes: '',
};

const IngredientForm: React.FC<IngredientFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<IngredientFormData>(
    initialData || defaultFormData
  );
  
  const [errors, setErrors] = useState<Partial<Record<keyof IngredientFormData, string>>>({});

  // Update form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle number inputs
    if (name === 'quantity') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field when it's changed
    if (errors[name as keyof IngredientFormData]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IngredientFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Get all categories
  const categories = getAllCategories();
  
  // Common units for ingredients
  const units = [
    { value: 'unit', label: 'Unit' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'ml', label: 'Milliliters (ml)' },
    { value: 'l', label: 'Liters (l)' },
    { value: 'tsp', label: 'Teaspoon (tsp)' },
    { value: 'tbsp', label: 'Tablespoon (tbsp)' },
    { value: 'cup', label: 'Cup' },
    { value: 'oz', label: 'Ounce (oz)' },
    { value: 'lb', label: 'Pound (lb)' },
    { value: 'bunch', label: 'Bunch' },
    { value: 'piece', label: 'Piece' },
    { value: 'slice', label: 'Slice' },
    { value: 'clove', label: 'Clove' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Ingredient Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter ingredient name"
        error={errors.name}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categories.map(category => ({
            value: category,
            label: formatCategoryName(category),
          }))}
          error={errors.category}
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="0"
            step="any"
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
            required
          />
          
          <Select
            label="Unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            options={units}
            error={errors.unit}
          />
        </div>
      </div>
      
      <Input
        label="Expiry Date"
        name="expiryDate"
        type="date"
        value={formData.expiryDate}
        onChange={handleChange}
        error={errors.expiryDate}
      />
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any notes about this ingredient"
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg shadow-sm placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[80px]"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {isEdit ? 'Update' : 'Add'} Ingredient
        </Button>
      </div>
    </form>
  );
};

export default IngredientForm;