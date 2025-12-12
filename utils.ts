import { Dimensions, ShapeType } from './types';

export const calculateArea = (shape: ShapeType, dims: Dimensions): number => {
  let area = 0; // in square meters

  const toM = (cm: number | undefined) => (cm || 0) / 100;

  switch (shape) {
    case 'square':
    case 'rectangle':
      area = toM(dims.length) * toM(dims.width);
      break;
    case 'round':
      const radius = toM(dims.diameter) / 2;
      area = Math.PI * radius * radius;
      break;
    case 'oval':
      // Area of ellipse = pi * a * b (where a, b are major/minor semi-axes)
      const a = toM(dims.length) / 2;
      const b = toM(dims.width) / 2;
      area = Math.PI * a * b;
      break;
    case 'octagon':
      // Simplified area calculation or bounding box depending on business logic.
      // Accurate regular octagon area is 2 * (1 + sqrt(2)) * side^2
      // But user inputs totalWidth and side. Let's approximate based on bounding box minus corners for custom cutting
      // Logic: Area = (TotalWidth * TotalWidth) - 4 * (0.5 * corner * corner)
      // Corner length can be derived from side.
      // For simplicity in this demo, we will use the bounding box logic as materials are cut from rolls.
      // (TotalWidth * TotalWidth) if strictly regular, but let's use TotalWidth * TotalWidth to be safe for the seller.
      const w = toM(dims.totalWidth);
      area = w * w; 
      break;
  }

  return area;
};

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(amount);
};
