'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { Product } from '@/lib/woocommerce';
import { useCart } from '@/providers/CartProvider';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailProps {
  product: Product;
  lng: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, lng }) => {
  const { t } = useTranslation(lng, 'common');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image?.sourceUrl || '');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-detail-container">
      <Link href={`/${lng}/shop`} className="back-to-shop">
        &larr; {t('back_to_shop')}
      </Link>
      
      <div className="product-detail-content">
        <div className="product-detail-images">
          <div className="product-detail-main-image">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={600}
                className="product-detail-image"
              />
            ) : (
              <div className="product-detail-image-placeholder"></div>
            )}
          </div>
          
          {product.galleryImages?.nodes && product.galleryImages.nodes.length > 0 && (
            <div className="product-detail-gallery">
              {product.image && (
                <div 
                  className={`product-detail-thumbnail ${selectedImage === product.image.sourceUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImage(product.image.sourceUrl)}
                >
                  <Image
                    src={product.image.sourceUrl}
                    alt={product.image.altText || product.name}
                    width={100}
                    height={100}
                  />
                </div>
              )}
              
              {product.galleryImages.nodes.map((image) => (
                <div 
                  key={image.id}
                  className={`product-detail-thumbnail ${selectedImage === image.sourceUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImage(image.sourceUrl)}
                >
                  <Image
                    src={image.sourceUrl}
                    alt={image.altText || product.name}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          
          <div className="product-detail-price">
            {product.onSale && product.regularPrice && (
              <span className="product-detail-regular-price">{product.regularPrice}</span>
            )}
            <span className="product-detail-current-price">{product.price}</span>
          </div>
          
          <div 
            className="product-detail-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          
          {product.purchasable && (
            <div className="product-detail-purchase">
              <div className="product-detail-quantity">
                <label htmlFor="quantity">{t('quantity')}:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              
              <button
                className="product-detail-add-to-cart"
                onClick={handleAddToCart}
              >
                {t('add_to_cart')}
              </button>
            </div>
          )}
          
          {!product.purchasable && (
            <p className="product-detail-not-purchasable">
              {t('product_not_available')}
            </p>
          )}
          
          {product.productCategories?.nodes && product.productCategories.nodes.length > 0 && (
            <div className="product-detail-categories">
              <span>{t('categories')}: </span>
              {product.productCategories.nodes.map((category, index) => (
                <React.Fragment key={category.id}>
                  <Link href={`/${lng}/shop/category/${category.slug}`}>
                    {category.name}
                  </Link>
                  {index < product.productCategories.nodes.length - 1 && ', '}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;