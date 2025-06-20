import { ArtworkFields } from './graphql';

// WooCommerce GraphQL queries
export const getProductCategories = `
  query getProductCategories {
    productCategories(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        description
        image {
          id
          sourceUrl
          altText
        }
        count
      }
    }
  }
`;

export const getProductBySlug = `
  query getProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
      }
      ... on ExternalProduct {
        price
        regularPrice
        salePrice
      }
      ... on GroupProduct {
        price
        regularPrice
        salePrice
      }
      ... on ProductWithPricing {
        price
        regularPrice
        salePrice
      }
      onSale
      purchasable
      status
      featured
      catalogVisibility
      type
      externalUrl
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      image {
        id
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
        }
      }
      related {
        nodes {
          id
          name
          slug
          ... on SimpleProduct {
            price
          }
          ... on VariableProduct {
            price
          }
          ... on ExternalProduct {
            price
          }
          ... on GroupProduct {
            price
          }
          ... on ProductWithPricing {
            price
          }
          image {
            id
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const getProducts = `
  query getProducts {
    products(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        description
        shortDescription
        onSale
        purchasable
        featured
        catalogVisibility
        type
        image {
          id
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const getProduct = `
  query getProduct($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
      }
      ... on ExternalProduct {
        price
        regularPrice
        salePrice
      }
      ... on GroupProduct {
        price
        regularPrice
        salePrice
      }
      ... on ProductWithPricing {
        price
        regularPrice
        salePrice
      }
      onSale
      purchasable
      status
      featured
      catalogVisibility
      type
      externalUrl
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      image {
        id
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
        }
      }
    }
  }
`;

// TypeScript interfaces for WooCommerce data
export interface ProductCategory {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  image: ProductImage | null;
  count: number;
}

export interface ProductImage {
  id: string;
  sourceUrl: string;
  altText: string;
}

export interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
  purchasable: boolean;
  // status: string;
  featured: boolean;
  catalogVisibility: string;
  type: string;
  // externalUrl: string;
  image: ProductImage;
  // galleryImages: {
  //   nodes: ProductImage[];
  // };
}

export interface ProductsResponse {
  products: {
    nodes: Product[];
  };
}

export interface ProductResponse {
  product: Product;
}

export interface ProductCategoriesResponse {
  productCategories: {
    nodes: ProductCategory[];
  };
}

export interface RelatedProductNode {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: ProductImage;
}

export interface RelatedProducts {
  nodes: RelatedProductNode[];
}

// Cart types
export interface CartItem {
  id: string;
  productId: number;
  name: string;
  quantity: number;
  price: string;
  total: string;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: string;
  itemCount: number;
}

// Function to fetch all products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: getProducts }),
      next: { revalidate: 100 }
    });

    const data = await res.json();
    console.log(data);

    // Check if data has the expected structure
    if (data && data.data && data.data.products && Array.isArray(data.data.products.nodes)) {
      return data.data.products.nodes;
    }

    // Return empty array if the expected data structure isn't present
    console.error('Error fetching products: Unexpected response structure', data);
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to fetch a single product by ID
export async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        query: getProduct,
        variables: { id: id }
      }),
      next: { revalidate: 100 }
    });

    const data = await res.json();

    // Check if data has the expected structure
    if (data && data.data && data.data.product) {
      return data.data.product;
    }

    // Return null if the expected data structure isn't present
    console.error('Error fetching product: Unexpected response structure', data);
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Function to fetch a single product by slug
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        query: getProductBySlug,
        variables: { slug: slug }
      }),
      next: { revalidate: 100 }
    });

    const data = await res.json();

    // Check if data has the expected structure
    if (data && data.data && data.data.product) {
      return data.data.product;
    }

    // Return null if the expected data structure isn't present
    console.error('Error fetching product by slug: Unexpected response structure', data);
    return null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

// Function to fetch product categories
export async function fetchProductCategories(): Promise<ProductCategory[]> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: getProductCategories }),
      next: { revalidate: 100 }
    });

    const data = await res.json();

    // Check if data has the expected structure
    if (data && data.data && data.data.productCategories && Array.isArray(data.data.productCategories.nodes)) {
      return data.data.productCategories.nodes;
    }

    // Return empty array if the expected data structure isn't present
    console.error('Error fetching product categories: Unexpected response structure', data);
    return [];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

// Local storage cart functions
export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], total: '0', itemCount: 0 };
  }

  const cart = localStorage.getItem('woocommerce_cart');
  if (cart) {
    return JSON.parse(cart);
  }

  return { items: [], total: '0', itemCount: 0 };
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('woocommerce_cart', JSON.stringify(cart));
}

export function addToCart(product: Product, quantity: number = 1): Cart {
  const cart = getCart();

  // Check if product already exists in cart
  const existingItemIndex = cart.items.findIndex(item => item.productId === product.databaseId);

  if (existingItemIndex >= 0) {
    // Update quantity if product already in cart
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].total = (parseFloat(cart.items[existingItemIndex].price) * cart.items[existingItemIndex].quantity).toFixed(2);
  } else {
    // Add new item to cart
    cart.items.push({
      id: product.id,
      productId: product.databaseId,
      name: product.name,
      quantity: quantity,
      price: product.price,
      total: (parseFloat(product.price) * quantity).toFixed(2),
      image: product.image?.sourceUrl || ''
    });
  }

  // Recalculate cart totals
  cart.itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
  cart.total = cart.items.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);

  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: number): Cart {
  const cart = getCart();

  // Remove item from cart
  cart.items = cart.items.filter(item => item.productId !== productId);

  // Recalculate cart totals
  cart.itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
  cart.total = cart.items.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);

  saveCart(cart);
  return cart;
}

export function updateCartItemQuantity(productId: number, quantity: number): Cart {
  const cart = getCart();

  // Find the item
  const itemIndex = cart.items.findIndex(item => item.productId === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return removeFromCart(productId);
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].total = (parseFloat(cart.items[itemIndex].price) * quantity).toFixed(2);

    // Recalculate cart totals
    cart.itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    cart.total = cart.items.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);

    saveCart(cart);
  }

  return cart;
}

export function clearCart(): Cart {
  const emptyCart = { items: [], total: '0', itemCount: 0 };
  saveCart(emptyCart);
  return emptyCart;
}
