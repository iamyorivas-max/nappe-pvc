import React from 'react';
import { SHAPES, ShapeType } from '../types';
import { Square, RectangleHorizontal, Circle, MousePointer2, Octagon } from 'lucide-react';

interface ShapeSelectorProps {
  selectedShape: ShapeType | null;
  onSelect: (shape: ShapeType) => void;
}

const ShapeIcon = ({ shape, className }: { shape: ShapeType, className?: string }) => {
  switch (shape) {
    case 'square': return <Square className={className} />;
    case 'rectangle': return <RectangleHorizontal className={className} />;
    case 'round': return <Circle className={className} />;
    case 'oval': return <div className={`border-2 border-current rounded-[50%] w-8 h-5 ${className?.replace('w-8 h-8', '')}`}></div>; // Custom CSS oval
    case 'octagon': return <Octagon className={className} />;
    default: return <MousePointer2 className={className} />;
  }
};

const ShapeSelector: React.FC<ShapeSelectorProps> = ({ selectedShape, onSelect }) => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Forme de votre table
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {SHAPES.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`group flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedShape === item.id
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`mb-3 ${selectedShape === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <ShapeIcon shape={item.id} className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShapeSelector;
