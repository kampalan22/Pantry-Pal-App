import React, { useState } from 'react';
import { IngredientsProvider } from './context/IngredientsContext';
import { ThemeProvider } from './context/ThemeContext';
import { useIngredients } from './context/IngredientsContext';
import AppHeader from './components/AppHeader';
import IngredientList from './components/IngredientList';
import IngredientForm from './components/IngredientForm';
import Modal from './components/ui/Modal';
import { IngredientFormData } from './types';

// Main app content that uses the ingredients context
const AppContent: React.FC = () => {
  const { getIngredientById, updateIngredient, addIngredient } = useIngredients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState<string | null>(null);
  
  const handleAddNew = () => {
    setCurrentIngredientId(null);
    setIsModalOpen(true);
  };
  
  const handleEdit = (id: string) => {
    setCurrentIngredientId(id);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentIngredientId(null);
  };
  
  const handleSubmit = (data: IngredientFormData) => {
    if (currentIngredientId) {
      updateIngredient(currentIngredientId, data);
    } else {
      addIngredient(data);
    }
    handleCloseModal();
  };
  
  const currentIngredient = currentIngredientId
    ? getIngredientById(currentIngredientId)
    : undefined;
  
  const currentFormData = currentIngredient
    ? {
        name: currentIngredient.name,
        category: currentIngredient.category,
        quantity: currentIngredient.quantity,
        unit: currentIngredient.unit,
        expiryDate: currentIngredient.expiryDate,
        notes: currentIngredient.notes,
      }
    : undefined;

  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-900 pt-safe">
      <AppHeader />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        <IngredientList
          onAddNew={handleAddNew}
          onEditIngredient={handleEdit}
        />
      </main>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentIngredientId ? 'Edit Ingredient' : 'Add New Ingredient'}
      >
        <IngredientForm
          initialData={currentFormData}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isEdit={!!currentIngredientId}
        />
      </Modal>
    </div>
  );
};

// Wrap the app with the ingredients provider
function App() {
  return (
    <ThemeProvider>
      <IngredientsProvider>
        <AppContent />
      </IngredientsProvider>
    </ThemeProvider>
  );
}

export default App;