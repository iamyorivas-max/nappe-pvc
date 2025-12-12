import React from 'react';
import { THICKNESSES, Thickness } from '../types';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  selectedThickness: Thickness | null;
  onSelect: (t: Thickness) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ selectedThickness, onSelect }) => {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Épaisseurs & Prix
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Choisissez l'épaisseur idéale pour votre protection.
          </p>
        </div>

        {/* Section Image Comparative */}
        <div className="mt-10 mb-12 max-w-4xl mx-auto">
           <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 group">
               <img 
                 src="https://images.unsplash.com/photo-1620611874307-55df98c474d4?q=80&w=2000&auto=format&fit=crop" 
                 alt="Comparaison des épaisseurs de nappe PVC" 
                 className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Guide des Épaisseurs</h3>
                  <p className="text-gray-200 text-sm sm:text-base max-w-2xl">
                    <strong>1.2mm</strong> : Idéal pour une protection discrète au quotidien.<br/>
                    <strong>1.8mm</strong> : Le parfait équilibre entre souplesse et robustesse.<br/>
                    <strong>2.5mm</strong> : Qualité luxe, protection maximale et retombée parfaite (aspect verre).
                  </p>
               </div>
           </div>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {THICKNESSES.map((tier) => {
            const isSelected = selectedThickness?.id === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => onSelect(tier)}
                className={`relative border rounded-2xl shadow-sm divide-y divide-gray-200 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-accent ring-2 ring-accent shadow-lg scale-105 bg-white z-10' 
                    : 'border-gray-200 bg-white hover:border-accent/50 hover:shadow-md'
                }`}
              >
                <div className="p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex justify-between items-center">
                    {tier.label}
                    {isSelected && <Check className="h-5 w-5 text-accent" />}
                  </h3>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">{tier.value}</span>
                    <span className="text-base font-medium text-gray-500"> mm</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Epaisseur
                  </p>
                  <div className="mt-6">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-base font-medium text-gray-500"> DHs / m²</span>
                  </div>
                  <p className="mt-4 text-sm text-green-600 font-semibold bg-green-50 inline-block px-2 py-1 rounded-full">
                    Frais de découpage inclus
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;