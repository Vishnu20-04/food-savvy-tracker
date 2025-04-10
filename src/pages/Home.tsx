
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarcodeScan, Plus, ClipboardList } from 'lucide-react';
import ExpiryNotification from '@/components/notifications/ExpiryNotification';

const Home = () => {
  return (
    <div className="space-y-6 py-6">
      <ExpiryNotification />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">Smart Food Tracker</h1>
        <p className="text-gray-600">Track your food items and reduce waste</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <BarcodeScan className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">Scan Barcode</h2>
            <p className="text-gray-600 mb-4">Scan packaged food items with your camera</p>
            <Link to="/scan">
              <Button>
                <BarcodeScan className="mr-2 h-4 w-4" />
                Scan Item
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Plus className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">Add Manually</h2>
            <p className="text-gray-600 mb-4">Add items manually with photos and details</p>
            <Link to="/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <ClipboardList className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">View Items</h2>
            <p className="text-gray-600 mb-4">See all your tracked items and their status</p>
            <Link to="/dashboard">
              <Button>
                <ClipboardList className="mr-2 h-4 w-4" />
                View Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
