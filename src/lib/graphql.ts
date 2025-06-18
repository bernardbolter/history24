import { gql } from "graphql-request"

export const getAllArtwork = `
    query getAllArtwork {
        allArtwork(first: 1000) {
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
    proportion: string;
    series: string;
    size: string;
    style: string;
    width: number;
    year: number;
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
    title: string;
    content: string;
    databaseId: number;
    id: string;
    date: string;
    featuredImage: FeaturedImage;
}

export interface ArtworkResponse {
    allArtwork: {
        nodes: Artwork[];
    };
}