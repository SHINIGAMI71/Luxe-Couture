import { Product } from './types';

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Silk Evening Gown',
    description: 'A breathtaking emerald silk gown with hand-stitched details and a flowing silhouette.',
    price: 2450,
    category: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://picsum.photos/seed/gown1/800/1200', 'https://picsum.photos/seed/gown2/800/1200'],
    featured: true,
    stock: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    name: 'Tailored Velvet Blazer',
    description: 'Masterfully crafted velvet blazer in midnight blue, featuring silk lapels.',
    price: 1890,
    category: 'Men',
    sizes: ['48', '50', '52', '54'],
    images: ['https://picsum.photos/seed/blazer1/800/1200', 'https://picsum.photos/seed/blazer2/800/1200'],
    featured: true,
    stock: 8,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p3',
    name: 'Gold Monogram Clutch',
    description: 'Elegant leather clutch with 24k gold-plated monogram clasp.',
    price: 1200,
    category: 'Accessories',
    sizes: ['One Size'],
    images: ['https://picsum.photos/seed/bag1/800/1200'],
    featured: true,
    stock: 12,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p4',
    name: 'Cashmere Overcoat',
    description: 'Ultra-soft Italian cashmere overcoat in camel. A timeless luxury staple.',
    price: 3200,
    category: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://picsum.photos/seed/coat1/800/1200'],
    featured: false,
    stock: 3,
    createdAt: new Date().toISOString()
  }
];
