
import React, { useEffect, useRef, useState } from 'react';
import { initBarcodeScanner, stopBarcodeScanner, onBarcodeDetected } from '@/utils/barcodeScanner';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff } from 'lucide-react';

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
}

const BarcodeScanner = ({ onDetected }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  
  const startScanner = async () => {
    try {
      setError(null);
      await initBarcodeScanner('barcode-scanner');
      setIsScanning(true);
      
      onBarcodeDetected((barcode) => {
        stopBarcodeScanner().then(() => {
          setIsScanning(false);
          onDetected(barcode);
        });
      });
    } catch (err) {
      setError('Could not access camera. Please ensure camera permissions are granted.');
      console.error('Scanner error:', err);
      setIsScanning(false);
    }
  };
  
  const stopScanner = async () => {
    await stopBarcodeScanner();
    setIsScanning(false);
  };
  
  useEffect(() => {
    return () => {
      stopBarcodeScanner();
    };
  }, []);
  
  return (
    <div className="w-full flex flex-col items-center">
      <div 
        id="barcode-scanner" 
        ref={scannerRef}
        className="w-full max-w-md aspect-video bg-black relative overflow-hidden rounded-lg my-4"
      >
        {!isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white p-4 text-center">
            <Camera size={48} className="mb-2" />
            <p>Press the button below to scan a barcode</p>
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        {isScanning ? (
          <Button
            variant="outline"
            onClick={stopScanner}
            className="flex items-center"
          >
            <CameraOff className="mr-2 h-4 w-4" />
            Stop Scanning
          </Button>
        ) : (
          <Button
            onClick={startScanner}
            className="flex items-center"
          >
            <Camera className="mr-2 h-4 w-4" />
            Start Scanning
          </Button>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
