import { getProductBySlug, getProducts } from '@/lib/woocommerce'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'

export async function generateStaticParams() {
  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getProducts }),
  })

  const data = await res.json()
  const products = data.data.products.nodes

  return products.map((product) => ({
    slug: product.slug,
  }))
}

async function getProduct(slug) {
  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      query: getProductBySlug,
      variables: { slug }
    }),
    next: { revalidate: 60 }
  })

  const data = await res.json()
  return data.data.product
}

const ProductPage = async ({ params: { slug, lng } }) => {
  const product = await getProduct(slug)

  if (!product) {
    return (
      <div className="store-container">
        <Nav lng={lng} />
        <Logo lng={lng} />
        <h1>Product not found</h1>
      </div>
    )
  }

  return (
    <div className="store-container">
      <Nav lng={lng} />
      <Logo lng={lng} />
      <div className="product-detail">
        <div className="product-image">
          {product.image && (
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText || product.name}
              width={600}
              height={600}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
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
          <div 
            className="description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          {product.stockStatus === 'IN_STOCK' && (
            <button 
              className="add-to-cart"
              onClick={() => {
                // TODO: Implement add to cart functionality
                console.log('Add to cart:', product.id)
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductPage 