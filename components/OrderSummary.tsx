import React from 'react';
import { OrderState, SHAPES, MATERIALS } from '../types';
import { calculateArea, formatPrice } from '../utils';

interface OrderSummaryProps {
  order: OrderState;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const { shape, material, thickness, dimensions } = order;

  if (!shape || !material || !thickness) return null;

  const area = calculateArea(shape, dimensions);
  const totalPrice = area * thickness.price;

  const shapeLabel = SHAPES.find(s => s.id === shape)?.label;
  const materialLabel = MATERIALS.find(m => m.id === material)?.label;

  const getDimText = () => {
    switch (shape) {
      case 'square':
      case 'rectangle': return `${dimensions.length || 0} x ${dimensions.width || 0} cm`;
      case 'round': return `Ø ${dimensions.diameter || 0} cm`;
      case 'oval': return `${dimensions.length || 0} x ${dimensions.width || 0} cm`;
      case 'octagon': return `${dimensions.totalWidth || 0} cm (largeur) / ${dimensions.side || 0} cm (côté)`;
      default: return '';
    }
  };

  return (
    <section className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="text-2xl font-bold text-gray-900 mb-6">Récapitulatif</h2>
         <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Forme</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{shapeLabel}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Matière</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{materialLabel}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Epaisseur</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{thickness.value} mm</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{getDimText()}</dd>
              </div>
              <div className="sm:col-span-2 border-t border-gray-300 pt-4 mt-2">
                 <div className="flex justify-between items-center">
                    <span className="text-base text-gray-500">Prix unitaire (au m²)</span>
                    <span className="text-base font-medium text-gray-900">{thickness.price} DHs</span>
                 </div>
                 <div className="flex justify-between items-center mt-2">
                    <span className="text-base text-gray-500">Surface estimée</span>
                    <span className="text-base font-medium text-gray-900">{area.toFixed(4)} m²</span>
                 </div>
                 <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-accent">{formatPrice(totalPrice)}</span>
                 </div>
              </div>
            </dl>
         </div>
      </div>
    </section>
  );
};

export default OrderSummary;
