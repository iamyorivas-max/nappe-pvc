import React from 'react';
import { CustomerInfo } from '../types';

interface OrderFormProps {
  customer: CustomerInfo;
  onChange: (info: CustomerInfo) => void;
  onSubmit: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ customer, onChange, onSubmit, isValid, isSubmitting }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...customer, [name]: value });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Vos Coordonnées
        </h2>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nom et Prénom</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={customer.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 border p-3 shadow-sm focus:border-accent focus:ring-accent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={customer.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 border p-3 shadow-sm focus:border-accent focus:ring-accent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                value={customer.city}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 border p-3 shadow-sm focus:border-accent focus:ring-accent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={customer.address}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 border p-3 shadow-sm focus:border-accent focus:ring-accent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="button"
                onClick={onSubmit}
                disabled={!isValid || isSubmitting}
                className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all ${
                  isValid && !isSubmitting ? 'bg-primary hover:bg-slate-800' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  'Valider la commande'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;