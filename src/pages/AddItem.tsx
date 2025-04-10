
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FoodItemForm from '@/components/food/FoodItemForm';
import { addFoodItem } from '@/services/foodItemService';
import { FoodItem } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AddItem = () => {
  const navigate = useNavigate();
  
  const handleFormSubmit = (data: Omit<FoodItem, 'id' | 'createdAt'>) => {
    addFoodItem(data);
    toast.success('Item added successfully!');
    navigate('/dashboard');
  };
  
  return (
    <div className="pb-10">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Add Food Item</h1>
      </div>
      
      <p className="text-gray-600 mb-6">
        Add details about your food item below.
      </p>
      
      <FoodItemForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddItem;
