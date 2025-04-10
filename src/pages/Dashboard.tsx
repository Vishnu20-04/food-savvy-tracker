
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodItemCard from '@/components/food/FoodItemCard';
import { getAllFoodItems, deleteFoodItem, getFoodStatus } from '@/services/foodItemService';
import { FoodItem, FoodStatus } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose 
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, Trash2, Filter } from 'lucide-react';
import ExpiryNotification from '@/components/notifications/ExpiryNotification';

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<FoodItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [filter, setFilter] = useState<FoodStatus | 'all'>('all');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    loadItems();
  }, []);
  
  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter(item => getFoodStatus(item.expiryDate) === filter)
      );
    }
  }, [filter, items]);
  
  const loadItems = () => {
    const foodItems = getAllFoodItems();
    setItems(foodItems);
    setFilteredItems(foodItems);
  };
  
  const handleEditItem = (id: string) => {
    navigate(`/edit/${id}`);
  };
  
  const openDeleteDialog = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (itemToDelete) {
      deleteFoodItem(itemToDelete);
      loadItems();
      toast.success('Item deleted successfully');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };
  
  const getFilterLabel = (filterValue: FoodStatus | 'all') => {
    switch (filterValue) {
      case 'fresh': return 'Fresh';
      case 'expiring': return 'Expiring Soon';
      case 'expired': return 'Expired';
      case 'all': default: return 'All Items';
    }
  };
  
  return (
    <div className="pb-10">
      <ExpiryNotification />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Your Food Items</h1>
        
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                {getFilterLabel(filter)}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter('all')}>
                All Items
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('fresh')}>
                Fresh
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('expiring')}>
                Expiring Soon
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('expired')}>
                Expired
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => navigate('/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No items found</p>
          <Button onClick={() => navigate('/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Item
          </Button>
        </div>
      ) : (
        <div>
          {filteredItems.map((item) => (
            <FoodItemCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
