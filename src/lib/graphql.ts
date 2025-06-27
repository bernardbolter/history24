export const getAllArtwork = `
    query getAllArtwork {
        allArtwork(where: {categoryName: "A Colorful History"}, first: 1000) {
            nodes {
                slug
                artworkFields {
                    city
                    artworklink {
                        url
                        title
                    }
                    artworkImage {
                        mediaDetails {
                            sizes(include: [MEDIUM, LARGE, THUMBNAIL]) {
                                sourceUrl
                                height
                                width
                            }
                            width
                            height
                        }
                        mediaItemUrl
                    }
                    country
                    forsale
                    height
                    lat
                    lng
                    medium
                    metadescription
                    metakeywords
                    orientation
                    proportion
                    series
                    size
                    style
                    width
                    year
                }
                colorfulFields {
                    wikiLinkEn
                    wikiLinkDe
                    storyEn
                    storyDe
                    ar
                }
                title(format: RENDERED)
                content(format: RENDERED)
                databaseId
                id
                date
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
            }
        }
    }
`

export const getAllProducts = `
    query getAllProducts {
        products(first: 100) {
            nodes {
                id
                databaseId
                name
                slug
                type
                status
                featured
                description
                shortDescription
                sku
                onSale
                dateOnSaleFrom
                dateOnSaleTo
                totalSales
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
                taxStatus
                taxClass
                manageStock
                stockQuantity
                stockStatus
                backorders
                soldIndividually
                weight
                length
                width
                height
                reviewCount
                averageRating
                purchasable
                purchaseNote
                catalogVisibility
                dateCreated
                dateModified
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
                productCategories {
                    nodes {
                        id
                        name
                        slug
                    }
                }
                productTags {
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
`

export const getArtworkBySlug = `
    query getArtworkBySlug($slug: ID!) {
        artwork(id: $slug, idType: SLUG) {
            slug
            artworkFields {
                city
                artworklink {
                    url
                    title
                }
                artworkImage {
                    mediaDetails {
                        sizes(include: [MEDIUM, LARGE, THUMBNAIL]) {
                            sourceUrl
                            height
                            width
                        }
                        width
                        height
                    }
                    mediaItemUrl
                }
                country
                forsale
                height
                lat
                lng
                medium
                metadescription
                metakeywords
                orientation
                proportion
                series
                size
                style
                width
                year
            }
            colorfulFields {
                wikiLinkEn
                wikiLinkDe
                storyEn
                storyDe
                ar
            }
            title(format: RENDERED)
            content(format: RENDERED)
            databaseId
            id
            date
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
        }
    }
`

export const getProductBySlug = `
    query getProductBySlug($slug: ID!) {
        product(id: $slug, idType: SLUG) {
            id
            databaseId
            name
            slug
            type
            status
            featured
            description
            shortDescription
            sku
            onSale
            dateOnSaleFrom
            dateOnSaleTo
            totalSales
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
            taxStatus
            taxClass
            manageStock
            stockQuantity
            stockStatus
            backorders
            soldIndividually
            weight
            length
            width
            height
            reviewCount
            averageRating
            purchasable
            purchaseNote
            catalogVisibility
            dateCreated
            dateModified
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
            productCategories {
                nodes {
                    id
                    name
                    slug
                }
            }
            productTags {
                nodes {
                    id
                    name
                    slug
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
`

// TypeScript interfaces for the artwork data
export interface ArtworkSize {
    sourceUrl: string;
    height: number;
    width: number;
}

export interface ArtworkMediaDetails {
    sizes: ArtworkSize[];
    width: number;
    height: number;
}

export interface ArtworkImage {
    mediaDetails: ArtworkMediaDetails;
    mediaItemUrl: string;
}

export interface ArtworkLink {
    url: string;
    title: string;
}

export interface ArtworkFields {
    city: string;
    artworklink: ArtworkLink;
    artworkImage: ArtworkImage;
    country: string;
    forsale: boolean;
    height: number;
    lat: number;
    lng: number;
    medium: string;
    metadescription: string;
    metakeywords: string;
    orientation: string;
    proportion: number;
    series: string;
    size: string;
    style: string;
    width: number;
    year: number;
}

export interface ColorfulFields {
    ar?: string;
    storyDe?: string;
    storyEn?: string;
    wikiLinkDe?: string;
    wikiLinkEn?: string;
}

export interface FeaturedImage {
    node: {
        sourceUrl: string;
        altText: string;
    };
}

export interface Artwork {
    slug: string;
    artworkFields: ArtworkFields;
    colorfulFields?: ColorfulFields;
    title: string;
    content: string;
    databaseId: number;
    id: string;
    date: string;
    featuredImage: FeaturedImage;
    index: number;
}

export interface ArtworkResponse {
    allArtwork: {
        nodes: Artwork[];
    };
}

export interface SingleArtworkResponse {
    artwork: Artwork;
}

// TypeScript interfaces for WooCommerce data
export interface ProductImage {
    id: string;
    sourceUrl: string;
    altText: string;
}

export interface ProductCategoryNode {
    id: string;
    name: string;
    slug: string;
}

export interface ProductTagNode {
    id: string;
    name: string;
    slug: string;
}

export interface ProductCategories {
    nodes: ProductCategoryNode[];
}

export interface ProductTags {
    nodes: ProductTagNode[];
}

export interface GalleryImages {
    nodes: ProductImage[];
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

export interface Product {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    type: string;
    status: string;
    featured: boolean;
    description: string;
    shortDescription: string;
    sku: string;
    onSale: boolean;
    dateOnSaleFrom: string | null;
    dateOnSaleTo: string | null;
    totalSales: number;
    price: string;
    regularPrice: string;
    salePrice: string;
    taxStatus: string;
    taxClass: string;
    manageStock: boolean;
    stockQuantity: number | null;
    stockStatus: string;
    backorders: string;
    soldIndividually: boolean;
    weight: string;
    length: string;
    width: string;
    height: string;
    reviewCount: number;
    averageRating: string;
    purchasable: boolean;
    purchaseNote: string;
    catalogVisibility: string;
    dateCreated: string;
    dateModified: string;
    image: ProductImage;
    galleryImages: GalleryImages;
    productCategories: ProductCategories;
    productTags: ProductTags;
    related?: RelatedProducts;
}

export interface ProductsResponse {
    products: {
        nodes: Product[];
    };
}

export interface ProductResponse {
    product: Product;
}

export interface ProductCategory {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    description: string;
    image: ProductImage | null;
    count: number;
}

export interface ProductCategoriesResponse {
    productCategories: {
        nodes: ProductCategory[];
    };
}
