'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { fetchProducts, Product } from '@/lib/woocommerce';
import { useCart } from '@/providers/CartProvider';
import Image from 'next/image';
import Link from 'next/link';

interface ProductsProps {
  lng: string;
  initialProducts?: Product[];
}

const Products: React.FC<ProductsProps> = ({ lng, initialProducts }) => {
  const { t } = useTranslation(lng, 'common');
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState<boolean>(!initialProducts);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!initialProducts) {
      const loadProducts = async () => {
        try {
          setLoading(true);
          const fetchedProducts = await fetchProducts();
          setProducts(fetchedProducts);
          setLoading(false);
        } catch (err) {
          setError('Failed to load products');
          setLoading(false);
          console.error('Error loading products:', err);
        }
      };

      loadProducts();
    }
  }, [initialProducts]);

  console.log("products: ", products)

  if (loading) {
    return <div className="products-loading">{t('loading')}</div>;
  }

  if (error) {
    return <div className="products-error">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="products-empty">{t('no_products')}</div>;
  }

  return (
    <div className="products-container">
      <h2 className="products-title">{t('shop')}</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/${lng}/product/${product.slug}`}>
              <div className="product-image-container">
                {product.image ? (
                  <Image
                    src={product.image.sourceUrl}
                    alt={product.image.altText || product.name}
                    width={300}
                    height={300}
                    className="product-image"
                  />
                ) : (
                  <div className="product-image-placeholder"></div>
                )}
                {product.onSale && (
                  <span className="product-sale-badge">{t('on_sale')}</span>
                )}
              </div>
              <h3 className="product-name">{product.name}</h3>
            </Link>
            <div className="product-details">
              <div className="product-price">
                {product.onSale && product.regularPrice && (
                  <span className="product-regular-price">{product.regularPrice}</span>
                )}
                <span className="product-current-price">{product.price}</span>
              </div>
              <button
                className="product-add-to-cart"
                onClick={() => addToCart(product)}
                disabled={!product.purchasable}
              >
                {t('add_to_cart')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;