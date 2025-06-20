import { Metadata } from 'next';
import { fetchProducts, Product } from '@/lib/woocommerce';
import { useTranslation } from '@/app/i18n';
import ProductDetail from '@/components/Shop/ProductDetail';

interface ProductPageProps {
  params: {
    lng: string;
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = params;
  
  // Fetch all products and find the one with matching slug
  const products = await fetchProducts();
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: product.name,
    description: product.shortDescription || product.description,
  };
}

// This function generates the static paths for all products
export async function generateStaticParams() {
  const products = await fetchProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { lng, slug } = params;
  const { t } = await useTranslation(lng, 'common');
  
  // Fetch all products and find the one with matching slug
  const products = await fetchProducts();
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="product-not-found">
        <h1>{t('product_not_found')}</h1>
        <p>{t('product_not_found_message')}</p>
      </div>
    );
  }
  
  return (
    <div className="product-page">
      <ProductDetail product={product} lng={lng} />
    </div>
  );
}