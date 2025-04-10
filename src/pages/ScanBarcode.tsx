
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '@/components/scanner/BarcodeScanner';
import FoodItemForm from '@/components/food/FoodItemForm';
import { addFoodItem } from '@/services/foodItemService';
import { FoodItem } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ScanBarcode = () => {
  const navigate = useNavigate();
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  
  const handleBarcodeDetected = (barcode: string) => {
    setScannedBarcode(barcode);
    // In a real app, we would fetch product details from an external API here
    toast.success(`Barcode detected: ${barcode}`);
  };
  
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
        <h1 className="text-2xl font-bold">Scan Barcode</h1>
      </div>
      
      {!scannedBarcode ? (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Position the barcode within the scanner area and hold steady.
          </p>
          <BarcodeScanner onDetected={handleBarcodeDetected} />
          
          <div className="mt-8 border-t pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/add')}
            >
              Skip and Add Manually
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-green-600 mb-6">
            Barcode scanned successfully! Please add item details below.
          </p>
          <FoodItemForm onSubmit={handleFormSubmit} barcode={scannedBarcode} />
        </div>
      )}
    </div>
  );
};

export default ScanBarcode;
