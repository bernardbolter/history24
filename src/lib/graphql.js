import { gql } from "graphql-request"

export const getAllArtwork = `
    query getAllArtwork {
        allArtwork(first: 1000, where: {categoryName: "A Colorful History"}) {
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
                databaseId
                id
                featuredImage {
                    node {
                        sizes
                        srcSet
                        sourceUrl
                        uri
                    }
                }
            }
        }
    }
`