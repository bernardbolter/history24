import { Metadata } from 'next';
import { fetchProducts } from '@/lib/woocommerce';
import { useTranslation } from '@/app/i18n';
import Products from '@/components/Shop/Products';
import Link from 'next/link';

interface ShopPageProps {
  params: {
    lng: string;
  };
}

export const metadata: Metadata = {
  title: 'Shop | A Colorful History',
  description: 'Browse and purchase artwork from Bernard Bolter',
};

export default async function ShopPage({ params: { lng } }: ShopPageProps) {
  const { t } = await useTranslation(lng, 'common');
  const products = await fetchProducts();
  
  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1 className="shop-title">{t('shop')}</h1>
        <p className="shop-description">{t('shop_description')}</p>
        <Link href={`/${lng}`} className="back-to-home">
          &larr; {t('back_to_home')}
        </Link>
      </div>
      
      <Products initialProducts={products} lng={lng} />
      
      <div className="shop-footer">
        <Link href={`/${lng}/cart`} className="view-cart-button">
          {t('view_cart')}
        </Link>
      </div>
    </div>
  );
}