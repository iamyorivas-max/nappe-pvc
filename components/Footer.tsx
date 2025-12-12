import React from 'react';
import { Truck, Wallet } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
          <div className="flex items-center space-x-3">
            <Truck className="h-6 w-6 text-accent" />
            <span className="text-lg font-medium">Livraison partout au Maroc</span>
          </div>
          <div className="hidden md:block h-8 w-px bg-slate-700"></div>
          <div className="flex items-center space-x-3">
            <Wallet className="h-6 w-6 text-accent" />
            <span className="text-lg font-medium">Paiement à la livraison</span>
          </div>
        </div>
        <div className="mt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Nappes PVC Sur Mesure. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
