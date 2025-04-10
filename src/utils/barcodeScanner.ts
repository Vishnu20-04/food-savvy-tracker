
import Quagga from '@ericblade/quagga2';

interface ScannerConfig {
  inputStream: {
    type: string;
    constraints: {
      width: number;
      height: number;
      facingMode: string;
    };
    area: {
      top: string;
      right: string;
      left: string;
      bottom: string;
    };
  };
  locator: {
    patchSize: string;
    halfSample: boolean;
  };
  numOfWorkers: number;
  decoder: {
    readers: string[];
  };
  locate: boolean;
}

let initialized = false;

export const initBarcodeScanner = (elementId: string): Promise<void> => {
  if (initialized) {
    return stopBarcodeScanner().then(() => initBarcodeScanner(elementId));
  }

  const config: ScannerConfig = {
    inputStream: {
      type: 'LiveStream',
      constraints: {
        width: { min: 640 },
        height: { min: 480 },
        facingMode: 'environment',
      },
      area: {
        top: '0%',
        right: '0%',
        left: '0%',
        bottom: '0%',
      },
    },
    locator: {
      patchSize: 'medium',
      halfSample: true,
    },
    numOfWorkers: navigator.hardwareConcurrency || 4,
    decoder: {
      readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader'],
    },
    locate: true,
  };

  return new Promise((resolve, reject) => {
    Quagga.init(config, (err) => {
      if (err) {
        console.error('Error initializing Quagga:', err);
        reject(err);
        return;
      }

      initialized = true;
      Quagga.start();
      resolve();
    });
  });
};

export const stopBarcodeScanner = (): Promise<void> => {
  if (!initialized) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    Quagga.stop();
    initialized = false;
    resolve();
  });
};

export const onBarcodeDetected = (callback: (barcode: string) => void): void => {
  Quagga.onDetected((result) => {
    if (result && result.codeResult && result.codeResult.code) {
      callback(result.codeResult.code);
    }
  });
};
