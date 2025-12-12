import React from 'react';
import { ShapeType, Dimensions } from '../types';

// Extraction du composant InputField à l'extérieur pour éviter qu'il ne soit recréé à chaque rendu (ce qui causait la perte de focus)
interface InputFieldProps {
  label: string;
  value: number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder }) => (
  <div className="col-span-1">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} (cm)</label>
    <input
      type="number"
      min="0"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-lg py-3 px-4 bg-gray-50 border"
      placeholder={placeholder || "0"}
    />
  </div>
);

interface DimensionsFormProps {
  shape: ShapeType;
  dimensions: Dimensions;
  onChange: (dims: Dimensions) => void;
}

const DimensionsForm: React.FC<DimensionsFormProps> = ({ shape, dimensions, onChange }) => {
  const handleChange = (field: keyof Dimensions, value: string) => {
    onChange({
      ...dimensions,
      [field]: parseFloat(value) || 0,
    });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Dimensions de la table
        </h2>
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(shape === 'square' || shape === 'rectangle') && (
              <>
                <InputField 
                  label="Longueur" 
                  value={dimensions.length} 
                  onChange={(v) => handleChange('length', v)} 
                />
                <InputField 
                  label="Largeur" 
                  value={dimensions.width} 
                  onChange={(v) => handleChange('width', v)} 
                />
              </>
            )}

            {shape === 'round' && (
              <div className="md:col-span-2">
                 <InputField 
                   label="Diamètre" 
                   value={dimensions.diameter} 
                   onChange={(v) => handleChange('diameter', v)} 
                 />
              </div>
            )}

            {shape === 'oval' && (
              <>
                <InputField 
                  label="Grand Axe (Longueur totale)" 
                  value={dimensions.length} 
                  onChange={(v) => handleChange('length', v)} 
                />
                <InputField 
                  label="Petit Axe (Largeur totale)" 
                  value={dimensions.width} 
                  onChange={(v) => handleChange('width', v)} 
                />
              </>
            )}

            {shape === 'octagon' && (
              <>
                <InputField 
                  label="Largeur Totale (plat à plat)" 
                  value={dimensions.totalWidth} 
                  onChange={(v) => handleChange('totalWidth', v)} 
                />
                <InputField 
                  label="Longueur d'un côté" 
                  value={dimensions.side} 
                  onChange={(v) => handleChange('side', v)} 
                />
              </>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center italic">
            * Veuillez saisir les dimensions exactes en centimètres.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DimensionsForm;