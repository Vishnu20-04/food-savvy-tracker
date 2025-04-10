
import { useEffect, useState } from 'react';
import { FoodItem } from '@/types';
import { getAllFoodItems, getFoodStatus } from '@/services/foodItemService';
import { toast } from 'sonner';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpiryNotification = () => {
  const navigate = useNavigate();
  const [hasChecked, setHasChecked] = useState(false);
  
  useEffect(() => {
    // Only check once per component mount
    if (!hasChecked) {
      checkExpiringItems();
      setHasChecked(true);
    }
    
    // Check again when the component is focused
    const handleFocus = () => {
      checkExpiringItems();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [hasChecked]);
  
  const checkExpiringItems = () => {
    const items = getAllFoodItems();
    const expiringItems = items.filter(item => 
      getFoodStatus(item.expiryDate) === 'expiring'
    );
    
    if (expiringItems.length > 0) {
      showExpiryNotification(expiringItems);
    }
  };
  
  const showExpiryNotification = (items: FoodItem[]) => {
    toast(
      <div>
        <div className="font-semibold flex items-center">
          <Bell className="mr-2 h-4 w-4 text-orange-500" />
          Items Expiring Soon
        </div>
        <p className="text-sm mt-1">
          You have {items.length} item{items.length === 1 ? '' : 's'} expiring soon.
        </p>
      </div>,
      {
        duration: 5000,
        action: {
          label: "View Items",
          onClick: () => navigate('/dashboard'),
        },
      }
    );
  };
  
  return null; // This is just a utility component, no UI needed
};

export default ExpiryNotification;
