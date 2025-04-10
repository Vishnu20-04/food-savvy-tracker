
import React from 'react';
import { FoodItem } from '@/types';
import { format } from 'date-fns';
import { getFoodStatus, getDaysUntilExpiry } from '@/services/foodItemService';
import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface FoodItemCardProps {
  item: FoodItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const FoodItemCard = ({ item, onEdit, onDelete }: FoodItemCardProps) => {
  const status = getFoodStatus(item.expiryDate);
  const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
  
  const getStatusDisplay = () => {
    if (status === 'expired') {
      return {
        bg: 'bg-expired-light',
        text: 'text-expired',
        badge: 'bg-expired',
        label: 'Expired',
      };
    } else if (status === 'expiring') {
      return {
        bg: 'bg-expiring-light',
        text: 'text-expiring',
        badge: 'bg-expiring',
        label: 'Expiring Soon',
      };
    } else {
      return {
        bg: 'bg-fresh-light',
        text: 'text-fresh',
        badge: 'bg-fresh',
        label: 'Fresh',
      };
    }
  };
  
  const statusDisplay = getStatusDisplay();
  
  return (
    <Card className={`${statusDisplay.bg} border-l-4 border-l-${status} mb-4 overflow-hidden`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600">
              Expires: {format(item.expiryDate, 'MMM dd, yyyy')}
            </p>
            <div className="flex items-center mt-2">
              <Badge className={statusDisplay.badge}>
                {statusDisplay.label}
              </Badge>
              <span className="ml-2 text-sm font-medium">
                {daysUntilExpiry === 0
                  ? 'Today'
                  : daysUntilExpiry > 0
                  ? `${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'} left`
                  : `${Math.abs(daysUntilExpiry)} day${Math.abs(daysUntilExpiry) === 1 ? '' : 's'} ago`}
              </span>
            </div>
          </div>
          
          {item.imageUrl && (
            <div className="w-20 h-20 rounded-md overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-2 bg-white flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(item.id)}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodItemCard;
