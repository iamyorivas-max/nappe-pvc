import React from 'react';
import { MATERIALS, MaterialType } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface MaterialSelectorProps {
  selectedMaterial: MaterialType | null;
  onSelect: (m: MaterialType) => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({ selectedMaterial, onSelect }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Type de Nappe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MATERIALS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`relative flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedMaterial === item.id
                  ? `border-gray-900 ring-1 ring-gray-900 bg-white`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`flex-shrink-0 h-12 w-12 rounded-full border ${item.color} shadow-sm`}></div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-bold text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 truncate">{item.description}</p>
              </div>
              {selectedMaterial === item.id && (
                <CheckCircle2 className="h-5 w-5 text-gray-900" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialSelector;
