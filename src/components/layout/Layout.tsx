
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 pb-20 md:pb-4 max-w-4xl">
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
