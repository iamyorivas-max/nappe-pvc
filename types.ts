export type ShapeType = 'square' | 'rectangle' | 'round' | 'oval' | 'octagon';

export type MaterialType = 'transparent' | 'matte' | 'gold';

export interface Thickness {
  id: string;
  value: number;
  price: number;
  label: string;
}

export interface Dimensions {
  length?: number;
  width?: number;
  diameter?: number;
  side?: number; // for octagon
  totalWidth?: number; // for octagon
}

export interface OrderState {
  shape: ShapeType | null;
  material: MaterialType | null;
  thickness: Thickness | null;
  dimensions: Dimensions;
  customer: CustomerInfo;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

export const SHAPES: { id: ShapeType; label: string; icon: string }[] = [
  { id: 'square', label: 'Carrée', icon: 'square' },
  { id: 'rectangle', label: 'Rectangulaire', icon: 'rectangle' },
  { id: 'round', label: 'Ronde', icon: 'circle' },
  { id: 'oval', label: 'Ovale', icon: 'oval' },
  { id: 'octagon', label: 'Octogone', icon: 'octagon' },
];

export const MATERIALS: { id: MaterialType; label: string; description: string; color: string }[] = [
  { id: 'transparent', label: 'Transparent', description: 'Clarté cristalline', color: 'bg-blue-50 border-blue-200' },
  { id: 'matte', label: 'Transparent Mat', description: 'Anti-reflet, élégant', color: 'bg-slate-100 border-slate-300' },
  { id: 'gold', label: 'Doré', description: 'Finition premium luxueuse', color: 'bg-yellow-50 border-yellow-300' },
];

export const THICKNESSES: Thickness[] = [
  { id: 't1', value: 1.2, price: 199, label: 'Standard' },
  { id: 't2', value: 1.8, price: 229, label: 'Premium' },
  { id: 't3', value: 2.5, price: 299, label: 'Luxe' },
];
