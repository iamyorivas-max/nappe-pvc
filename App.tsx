import React, { useState, useRef } from 'react';
import { OrderState, Thickness, ShapeType, MaterialType, Dimensions, CustomerInfo, SHAPES, MATERIALS } from './types';
import Hero from './components/Hero';
import PricingSection from './components/PricingSection';
import ShapeSelector from './components/ShapeSelector';
import MaterialSelector from './components/MaterialSelector';
import DimensionsForm from './components/DimensionsForm';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';
import Footer from './components/Footer';
import { calculateArea, formatPrice } from './utils';

const App: React.FC = () => {
  const [order, setOrder] = useState<OrderState>({
    shape: null,
    material: null,
    thickness: null,
    dimensions: {},
    customer: { fullName: '', phone: '', address: '', city: '' },
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for auto-scrolling
  const pricingRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updateOrder = (updates: Partial<OrderState>) => {
    setOrder(prev => ({ ...prev, ...updates }));
  };

  const handleStart = () => scrollTo(pricingRef);

  const handleThicknessSelect = (thickness: Thickness) => {
    updateOrder({ thickness });
    setTimeout(() => scrollTo(shapeRef), 200);
  };

  const handleShapeSelect = (shape: ShapeType) => {
    updateOrder({ shape, dimensions: {} }); // reset dims on shape change
    setTimeout(() => scrollTo(materialRef), 200);
  };

  const handleMaterialSelect = (material: MaterialType) => {
    updateOrder({ material });
    setTimeout(() => scrollTo(dimRef), 200);
  };

  const handleDimensionsChange = (dimensions: Dimensions) => {
    updateOrder({ dimensions });
  };

  const handleCustomerChange = (customer: CustomerInfo) => {
    updateOrder({ customer });
  };

  const validateOrder = (): boolean => {
    const { shape, thickness, material, dimensions, customer } = order;
    if (!shape || !thickness || !material) return false;
    if (calculateArea(shape, dimensions) <= 0) return false;
    if (!customer.fullName || !customer.phone || !customer.address || !customer.city) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!validateOrder()) return;

    setIsSubmitting(true);

    // Préparation des données pour l'email
    const area = calculateArea(order.shape!, order.dimensions);
    const totalPrice = area * (order.thickness?.price || 0);
    const shapeLabel = SHAPES.find(s => s.id === order.shape)?.label || order.shape;
    const materialLabel = MATERIALS.find(m => m.id === order.material)?.label || order.material;

    // Construction d'une chaîne lisible pour les dimensions
    const dimensionsStr = Object.entries(order.dimensions)
      .map(([key, value]) => `${key}: ${value}cm`)
      .join(', ');

    const formData = {
      ...order.customer,
      Produit_Forme: shapeLabel,
      Produit_Matiere: materialLabel,
      Produit_Epaisseur: `${order.thickness?.value}mm (${order.thickness?.label})`,
      Dimensions_Details: dimensionsStr,
      Surface_Totale: `${area.toFixed(4)} m²`,
      Prix_Total: formatPrice(totalPrice),
      _subject: `Nouvelle commande de ${order.customer.fullName}`, // Sujet de l'email
    };

    try {
      const response = await fetch("https://formspree.io/f/movgydnl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Une erreur est survenue lors de l'envoi de la commande. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      alert("Erreur de connexion. Veuillez vérifier votre connexion internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Commande Validée !</h2>
          <p className="text-gray-600 mb-6">
            Merci {order.customer.fullName}. Nous avons bien reçu votre commande. 
            Nous vous contacterons bientôt au {order.customer.phone} pour confirmer la livraison.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-slate-800 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Hero onStart={handleStart} />

      <div ref={pricingRef}>
        <PricingSection selectedThickness={order.thickness} onSelect={handleThicknessSelect} />
      </div>

      {order.thickness && (
        <div ref={shapeRef} className="animate-fade-in-up">
          <ShapeSelector selectedShape={order.shape} onSelect={handleShapeSelect} />
        </div>
      )}

      {order.shape && (
        <div ref={materialRef} className="animate-fade-in-up">
          <MaterialSelector selectedMaterial={order.material} onSelect={handleMaterialSelect} />
        </div>
      )}

      {order.material && (
        <div ref={dimRef} className="animate-fade-in-up">
          <DimensionsForm shape={order.shape!} dimensions={order.dimensions} onChange={handleDimensionsChange} />
        </div>
      )}

      {calculateArea(order.shape || 'square', order.dimensions) > 0 && (
        <div ref={orderRef} className="animate-fade-in-up">
           <OrderSummary order={order} />
           <OrderForm 
             customer={order.customer} 
             onChange={handleCustomerChange} 
             onSubmit={handleSubmit} 
             isValid={validateOrder()} 
             isSubmitting={isSubmitting}
           />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;