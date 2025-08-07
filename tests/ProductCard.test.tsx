import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  it('renders product info', () => {
    render(
      <ProductCard
        product={{ id: '1', slug: 's', title: 'Title', description: 'Desc', ratingAvg: 4.2 }}
      />
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });
});