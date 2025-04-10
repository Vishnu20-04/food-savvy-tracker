
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FoodItemForm from '@/components/food/FoodItemForm';
import { updateFoodItem, getAllFoodItems } from '@/services/foodItemService';
import { FoodItem } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<FoodItem | null>(null);
  
  useEffect(() => {
    if (id) {
      const allItems = getAllFoodItems();
      const foundItem = allItems.find(item => item.id === id);
      if (foundItem) {
        setItem(foundItem);
      } else {
        toast.error('Item not found');
        navigate('/dashboard');
      }
    }
  }, [id, navigate]);
  
  const handleFormSubmit = (data: Omit<FoodItem, 'id' | 'createdAt'>) => {
    if (id) {
      updateFoodItem(id, data);
      toast.success('Item updated successfully!');
      navigate('/dashboard');
    }
  };
  
  if (!item) {
    return <div>Loading...</div>;
  }
  
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
        <h1 className="text-2xl font-bold">Edit Food Item</h1>
      </div>
      
      <FoodItemForm initialData={item} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default EditItem;
