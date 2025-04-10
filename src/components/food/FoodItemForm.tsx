
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FoodItem } from '@/types';
import { format } from 'date-fns';
import { Camera } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  expiryDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date',
  }),
  barcode: z.string().optional(),
  imageFile: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface FoodItemFormProps {
  initialData?: Partial<FoodItem>;
  onSubmit: (data: Omit<FoodItem, 'id' | 'createdAt'>) => void;
  barcode?: string;
}

const FoodItemForm = ({ initialData, onSubmit, barcode }: FoodItemFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      expiryDate: initialData?.expiryDate 
        ? format(initialData.expiryDate, 'yyyy-MM-dd')
        : format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      barcode: barcode || initialData?.barcode || '',
      imageFile: undefined,
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('imageFile', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (data: FormData) => {
    const submissionData: Omit<FoodItem, 'id' | 'createdAt'> = {
      name: data.name,
      expiryDate: new Date(data.expiryDate),
      barcode: data.barcode || undefined,
      imageUrl: data.imageFile 
        ? imagePreview
        : initialData?.imageUrl,
    };
    
    onSubmit(submissionData);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter food item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {barcode && (
          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode</FormLabel>
                <FormControl>
                  <Input readOnly {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        
        <div className="space-y-2">
          <Label htmlFor="image">Item Image (Optional)</Label>
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center"
            >
              <Camera className="mr-2 h-4 w-4" />
              {imagePreview ? 'Change Image' : 'Add Image'}
            </Button>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          
          {imagePreview && (
            <div className="mt-4 relative w-full max-w-md mx-auto">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="rounded-md w-full h-48 object-cover"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImagePreview(null);
                  form.setValue('imageFile', undefined);
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        
        <Button type="submit" className="w-full">
          {initialData ? 'Update Item' : 'Add Item'}
        </Button>
      </form>
    </Form>
  );
};

export default FoodItemForm;
