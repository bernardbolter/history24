import { gql } from "graphql-request"

export const getProducts = `
  query GetProducts {
    products(first: 100) {
      nodes {
        id
        name
        description
        price
        regularPrice
        salePrice
        onSale
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          stockStatus
          stockQuantity
        }
        productCategories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`

export const getCategories = `
  query GetCategories {
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
        description
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`

export const getProductBySlug = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      description
      price
      regularPrice
      salePrice
      onSale
      slug
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        stockStatus
        stockQuantity
      }
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
` 