'use client'

import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link href={`/store/product/${product.slug}`}>
        <div className="product-image">
          {product.image && (
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              width={300}
              height={300}
              style={{ objectFit: 'cover' }}
            />
          )}
          {product.onSale && (
            <div className="sale-badge">Sale</div>
          )}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="price-container">
            {product.onSale ? (
              <>
                <span className="regular-price">${product.regularPrice}</span>
                <span className="sale-price">${product.salePrice}</span>
              </>
            ) : (
              <span className="price">${product.price}</span>
            )}
          </div>
          <div className="stock-status">
            {product.stockStatus === 'IN_STOCK' ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard 