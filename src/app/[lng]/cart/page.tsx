'use client';

import React from 'react';
import { useTranslation } from '@/app/i18n/client';
import { useCart } from '@/providers/CartProvider';
import Link from 'next/link';
import Image from 'next/image';

interface CartPageProps {
  params: {
    lng: string;
  };
}

export default function CartPage({ params: { lng } }: CartPageProps) {
  const { t } = useTranslation(lng, 'common');
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    // Redirect to the checkout page on the WooCommerce site
    window.location.href = 'https://digitalcityseries.com/bolter/checkout/';
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1>{t('your_cart')}</h1>
        <p>{t('cart_empty')}</p>
        <Link href={`/${lng}/shop`} className="continue-shopping">
          {t('continue_shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">{t('your_cart')}</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>{t('product')}</th>
                <th>{t('price')}</th>
                <th>{t('quantity')}</th>
                <th>{t('total')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const itemTotal = parseFloat(item.product.price) * item.quantity;
                
                return (
                  <tr key={item.product.id} className="cart-item">
                    <td className="cart-item-product">
                      <div className="cart-item-image">
                        {item.product.image && (
                          <Image
                            src={item.product.image.sourceUrl}
                            alt={item.product.image.altText || item.product.name}
                            width={80}
                            height={80}
                          />
                        )}
                      </div>
                      <div className="cart-item-name">
                        <Link href={`/${lng}/product/${item.product.slug}`}>
                          {item.product.name}
                        </Link>
                      </div>
                    </td>
                    <td className="cart-item-price">
                      {item.product.price}
                    </td>
                    <td className="cart-item-quantity">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                      />
                    </td>
                    <td className="cart-item-total">
                      ${itemTotal.toFixed(2)}
                    </td>
                    <td className="cart-item-remove">
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="remove-item"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          <div className="cart-actions">
            <button onClick={handleClearCart} className="clear-cart">
              {t('clear_cart')}
            </button>
            <Link href={`/${lng}/shop`} className="continue-shopping">
              {t('continue_shopping')}
            </Link>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>{t('order_summary')}</h2>
          
          <div className="cart-totals">
            <div className="cart-subtotal">
              <span>{t('subtotal')}:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="cart-total">
              <span>{t('total')}:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <button onClick={handleCheckout} className="checkout-button">
            {t('proceed_to_checkout')}
          </button>
          
          <div className="cart-notes">
            <p>{t('secure_checkout')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}