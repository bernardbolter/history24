'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/providers/CartProvider';
import { useTranslation } from '@/app/i18n/client';

interface CartIconProps {
  lng: string;
}

const CartIcon: React.FC<CartIconProps> = ({ lng }) => {
  const { cartCount, cartTotal } = useCart();
  const { t } = useTranslation(lng, 'common');

  return (
    <div className="cart-icon-container">
      <Link href={`/${lng}/cart`} className="cart-icon-link">
        <div className="cart-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </div>
        {cartCount > 0 && (
          <div className="cart-total-amount">
            ${cartTotal.toFixed(2)}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;