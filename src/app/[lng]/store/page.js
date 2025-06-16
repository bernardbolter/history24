import { getProducts } from '@/lib/woocommerce'
import ProductCard from '@/components/ProductCard'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'

async function getStoreProducts() {
  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getProducts }),
    next: { revalidate: 60 } // Revalidate every minute
  })

  const data = await res.json()
  console.log(data)
  return data.data.products.nodes
}

const Store = async ({ params: { lng } }) => {
  const products = await getStoreProducts()

  return (
    <section className="store-container">
      <Nav lng={lng} />
      <Logo lng={lng} />
      <h1>Store</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Store